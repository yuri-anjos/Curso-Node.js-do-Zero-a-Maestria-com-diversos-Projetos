import { Link } from "react-router-dom";
import formStyle from "../../form/Form.module.css";
import Input from "../../form/input/Input";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
	const [loginForm, setLoginForm] = useState({});
	const { login } = useContext(UserContext);

	const handleOnChange = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login(loginForm);
	};

	return (
		<section className={formStyle.form_container}>
			<h1>Cadastro</h1>
			<form onSubmit={handleSubmit}>
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

				<input type="submit" value="Entrar" />
			</form>
			<p>
				Não tem conta? <Link to="/register">Clique Aqui!</Link>
			</p>
		</section>
	);
};

export default Login;
