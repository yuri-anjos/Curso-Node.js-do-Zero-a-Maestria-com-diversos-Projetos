import Input from "../../form/input/Input";
import formStyle from "../../form/Form.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";

const Register = () => {
	const [user, setUser] = useState({});
	const { register } = useContext(UserContext);

	const handleOnChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		register(user);
	};

	return (
		<section className={formStyle.form_container}>
			<h1>Cadastro</h1>
			<form onSubmit={handleSubmit}>
				<Input
					text="Nome"
					type="text"
					name="name"
					placeholder="Digite o seu nome"
					handleOnChange={handleOnChange}
				/>

				<Input
					text="Telefone"
					type="text"
					name="phone"
					placeholder="Digite o seu telefone"
					handleOnChange={handleOnChange}
				/>

				<Input
					text="Email"
					type="email"
					name="email"
					placeholder="Digite o seu e-mail"
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

				<input type="submit" value="Cadastrar" />
			</form>
			<p>
				Já tem conta? <Link to="/login">Clique Aqui!</Link>
			</p>
		</section>
	);
};

export default Register;
