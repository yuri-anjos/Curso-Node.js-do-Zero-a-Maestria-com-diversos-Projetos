import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

const useAuth = () => {
	const { setFlashMessage } = useFlashMessage();
	const [authenticated, setAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			setAuthenticated(true);
		}
	}, []);

	async function authUser(token) {
		setAuthenticated(true);
		localStorage.setItem("token", JSON.stringify(token));
		api.defaults.headers.Authorization = `Bearer ${token}`;
		navigate("/");
	}

	async function register(user) {
		let message;
		let type;

		api.post("/user/register", user)
			.then(({ data }) => {
				type = "success";
				message = "Cadastro realizado com sucesso!";
				authUser(data.token);
			})
			.catch((error) => {
				message = error.response?.data.message || "Erro inesperado!";
				type = "error";
				console.error("Error: " + error);
			})
			.finally(() => {
				setFlashMessage(message, type);
			});
	}

	async function login(loginForm) {
		let message;
		let type;

		await api
			.post("/user/login", loginForm)
			.then(({ data }) => {
				type = "success";
				message = "Login realizado com sucesso!";
				authUser(data.token);
			})
			.catch((error) => {
				message = error.response?.data.message || "Erro inesperado!";
				type = "error";
				console.error("Error: " + error);
			})
			.finally(() => {
				setFlashMessage(message, type);
			});
	}

	function logout() {
		const message = "Logout realizado com sucesso!";
		const type = "success";

		setAuthenticated(false);
		localStorage.removeItem("token");
		api.defaults.headers.Authorization = undefined;
		navigate("/");

		setFlashMessage(message, type);
	}

	return { register, authenticated, login, logout };
};

export default useAuth;
