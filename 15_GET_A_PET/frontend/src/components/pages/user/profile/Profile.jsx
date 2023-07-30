import profileStyle from "./Profile.module.css";
import formStyle from "../../../form/Form.module.css";
import Input from "../../../form/input/Input";
import { useEffect, useState } from "react";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import RoundedImage from "../../../layouts/roundedImage/RoundedImage";

const Profile = () => {
	const [form, setForm] = useState({});
	const [preview, setPreview] = useState();

	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {
		console.log(process.env);
		console.log(process.env.REACT_APP_API);

		api.get("/user/checkuser").then(({ data }) => {
			setForm(data);
		});
	}, []);

	const handleOnChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleOnFileChange = (e) => {
		setPreview(e.target.files[0]);
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

	return (
		<section className={formStyle.form_container}>
			<div className={profileStyle.profile_container}>
				<h1>Perfil</h1>
				{(form.image || preview) && (
					<>
						<RoundedImage
							src={
								preview
									? URL.createObjectURL(preview)
									: `${process.env.REACT_APP_API}/images/users/${form.image}`
							}
							alt={form.name}
						/>
					</>
				)}
			</div>

			<form onSubmit={handleSubmit}>
				<Input
					text="Imagem"
					type="file"
					name="image"
					handleOnChange={handleOnFileChange}
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
