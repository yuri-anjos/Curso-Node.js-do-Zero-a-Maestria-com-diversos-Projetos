import profileStyle from "./Profile.module.css";
import formStyle from "../../../form/Form.module.css";
import Input from "../../../form/input/Input";
import { useEffect, useState } from "react";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import RoundedImage from "../../../layouts/roundedImage/RoundedImage";
import { Buffer } from "buffer";

const Profile = () => {
	const [form, setForm] = useState({});
	const [preview, setPreview] = useState();

	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {
		api.get("/user/checkuser").then(({ data }) => {
			if (data.image) {
				const buffer = Buffer.from(data.image.data).toString("base64");
				const photo = `data:${data.image.contentType};base64,${buffer}`;
				setPreview(photo);
			}

			setForm(data);
		});
	}, []);

	const handleOnChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleOnFileChange = (e) => {
		setPreview(URL.createObjectURL(e.target.files[0]));
		setForm({ ...form, [e.target.name]: e.target.files[0] });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let message = "Usuário alterado com sucesso!";
		let type = "success";

		const formData = new FormData();
		Object.keys(form).forEach((key) => {
			formData.append(key, form[key]);
		});

		api.put("/user", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then(({ data }) => {
				message = data.message;
			})
			.catch((error) => {
				message = error.response?.data.message || "Erro inesperado!";
				type = "error";
				console.error("Error: " + error);
			})
			.finally(() => {
				setFlashMessage(message, type);
			});
	};

	const handlePhotoDelete = () => {
		api.delete("/user/photo")
			.then(() => {
				setPreview(null);
				setForm({ ...form, image: null });
			})
			.catch((error) => {
				const message = error.response?.data.message || "Erro inesperado!";
				const type = "error";
				setFlashMessage(message, type);
			});
	};

	return (
		<section className={formStyle.form_container}>
			<div className={profileStyle.profile_container}>
				<h1>Perfil</h1>
				<RoundedImage
					src={preview}
					alt={form.name}
					htmlFor="image"
					deletable={form.image}
					handleDelete={handlePhotoDelete}
				/>
			</div>

			<form onSubmit={handleSubmit}>
				<Input
					text="Imagem"
					type="file"
					name="image"
					handleOnChange={handleOnFileChange}
					hidden={true}
				/>

				<Input
					text="Email"
					type="email"
					name="email"
					placeholder="Digite o seu e-mail"
					value={form.email || ""}
					handleOnChange={handleOnChange}
				/>

				<Input
					text="Nome"
					type="text"
					name="name"
					placeholder="Digite o seu nome"
					value={form.name || ""}
					handleOnChange={handleOnChange}
				/>

				<Input
					text="Telefone"
					type="text"
					name="phone"
					placeholder="Digite o seu telefone"
					value={form.phone || ""}
					handleOnChange={handleOnChange}
				/>

				<Input
					text="Senha"
					type="password"
					name="password"
					placeholder="Digite a sua senha"
					handleOnChange={handleOnChange}
				/>

				<Input
					text="Confirmação de Senha"
					type="password"
					name="confirmPassword"
					placeholder="Confirme a sua senha"
					handleOnChange={handleOnChange}
				/>

				<input type="submit" value="Editar" />
			</form>
		</section>
	);
};

export default Profile;
