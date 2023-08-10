const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { isValidObjectId } = require("mongoose");
const { log } = require("console");

module.exports = class UserController {
	static async register(req, res) {
		const { name, email, phone, password, confirmPassword } = req.body;

		if (!name) {
			res.status(422).json({ message: "O NOME é obrigatório!" });
			return;
		}

		if (!email) {
			res.status(422).json({ message: "O EMAIL é obrigatório!" });
			return;
		}

		if (!phone) {
			res.status(422).json({ message: "O TELEFONE é obrigatório!" });
			return;
		}

		if (!password) {
			res.status(422).json({ message: "A SENHA é obrigatória!" });
			return;
		}

		if (!confirmPassword) {
			res.status(422).json({
				message: "A CONFIRMAÇÃO DE SENHA é obrigatória!",
			});
			return;
		}

		if (password !== confirmPassword) {
			res.status(422).json({
				message: "A SENHA e CONFIRMAÇÃO DE SENHA devem ser iguais!",
			});
			return;
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(422).json({ message: "Por favor utilize outro email!" });
			return;
		}

		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(password, salt);

		const user = new User({ name, phone, email, password: hash });
		try {
			const newUser = await user.save();
			await createUserToken(newUser, req, res);
		} catch (error) {
			res.status(500).json({ message: "Erro inesperado!", error });
			console.error("Error: " + error);
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;

		if (!email) {
			res.status(422).json({ message: "O EMAIL é obrigatório!" });
			return;
		}

		if (!password) {
			res.status(422).json({ message: "A SENHA é obrigatória!" });
			return;
		}

		const user = (await User.findOne({ email })) || {};
		const checkPassword = bcrypt.compareSync(password, user.password);
		if (!checkPassword) {
			res.status(422).json({ message: "EMAIL ou SENHA inválidos!" });
			return;
		}

		await createUserToken(user, req, res);
	}

	static async checkUser(req, res) {
		const token = getToken(req);

		if (token) {
			try {
				const decoded = jwt.verify(token, "secret");
				const user = await User.findById(decoded.id).select("-password");
				res.status(200).send(user);
				return;
			} catch {}
		}

		res.status(200).send(null);
	}

	static async getUserById(req, res) {
		const id = req.params.id;

		if (!isValidObjectId(id)) {
			res.status(422).json({ message: "ID inválido!" });
			return;
		}

		try {
			const user = await User.findById(id).select("-password");
			if (!user) {
				res.status(404).json({ message: "Usuário não encontrado!" });
				return;
			}
			res.status(200).json({ user });
		} catch (error) {
			res.status(500).json({ message: "Erro inesperado!" });
			console.error("Error: " + error);
		}
	}

	static async editUser(req, res) {
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (!user) {
			res.status(422).json({ message: "Usuário não encontrado!" });
			return;
		}

		const { name, email, phone, password, confirmPassword } = req.body;

		if (!name) {
			res.status(422).json({ message: "O NOME é obrigatório!" });
			return;
		}

		if (!email) {
			res.status(422).json({ message: "O EMAIL é obrigatório!" });
			return;
		}

		if (!phone) {
			res.status(422).json({ message: "O TELEFONE é obrigatório!" });
			return;
		}

		const userExists = await User.findOne({ email });
		if (userExists && user.email !== email) {
			res.status(422).json({ message: "Por favor utilize outro email!" });
			return;
		}

		const updatedData = {
			name,
			email,
			phone,
		};

		if (req.file) {
			updatedData.image = {
				data: req.file.buffer,
				contentType: req.file.mimetype,
			};
		}

		if (password || confirmPassword) {
			if (password !== confirmPassword) {
				res.status(422).json({
					message: "A SENHA e CONFIRMAÇÃO DE SENHA devem ser iguais!",
				});
				return;
			}
			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);
			updatedData.password = hash;
		}

		try {
			await User.updateOne({ _id: user._id }, updatedData);
			res.status(200).json({
				message: "Usuário atualizado com sucesso!",
			});
		} catch (error) {
			console.error("Error: " + error);
			res.status(500).json({ message: "Erro inesperado!", error });
		}
	}

	static async deletePhoto(req, res) {
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (!user) {
			res.status(422).json({ message: "Usuário não encontrado!" });
			return;
		}

		user.image = null;

		try {
			await user.save();
			res.status(200).json({
				message: "Imagem removida com sucesso!",
			});
		} catch (error) {
			console.error("Error: " + error);
			res.status(500).json({ message: "Erro inesperado!", error });
		}
	}
};
