import style from "./AddPet.module.css";

import api from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import PetForm from "../../../form/petForm/PetForm";

const AddPet = () => {
	const { setFlashMessage } = useFlashMessage();
	const navigate = useNavigate();

	const registerPet = (pet) => {
		let type;
		let message;

		const formData = new FormData();
		Object.keys(pet).forEach((key) => {
			if (key === "images") {
				Object.values(pet[key]).forEach((image) => {
					formData.append("images", image);
				});
			} else {
				formData.append(key, pet[key]);
			}
		});

		api.post("/pet", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then(({ data }) => {
				type = "success";
				message = data.message;
				navigate("/pet/mypets");
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
		<section className={style.addpet_header}>
			<div>
				<h1>Cadastre um Pet</h1>
				<p>Depois ele ficará disponível pra adoção</p>
			</div>
			<PetForm btnText="Cadastrar Pet" handleSubmit={registerPet} />
		</section>
	);
};

export default AddPet;
