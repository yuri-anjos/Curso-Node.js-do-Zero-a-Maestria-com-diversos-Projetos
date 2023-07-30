import style from "./EditPet.module.css";

import { useNavigate, useParams } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import api from "../../../../utils/api";
import PetForm from "../../../form/petForm/PetForm";
import { useEffect, useState } from "react";

const EditPet = () => {
	const { setFlashMessage } = useFlashMessage();
	const navigate = useNavigate();
	const [pet, setPet] = useState({});
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			getPet(id);
		}
	}, [id]);

	const getPet = (id) => {
		api.get(`/pet/${id}`)
			.then(({ data }) => {
				setPet(data.pet);
			})
			.catch((error) => {
				const message =
					error.response?.data.message || "Erro inesperado!";
				const type = "error";
				console.error("Error: " + error);
				setFlashMessage(message, type);
			});
	};

	const editPet = (petData) => {
		let type;
		let message;

		const formData = new FormData();
		Object.keys(petData).forEach((key) => {
			if (key === "images") {
				Object.values(petData[key]).forEach((image) => {
					formData.append("images", image);
				});
			} else {
				formData.append(key, petData[key]);
			}
		});

		api.put(`/pet/${pet._id}`, formData, {
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
		<section className={style.editpet_header}>
			<div>
				<h1>Editando o Pet: {pet.name}</h1>
				<p>Depois da edição os dados serão atualizados no sistema!</p>
			</div>
			{pet._id && (
				<PetForm
					btnText="Atualizar"
					handleSubmit={editPet}
					petData={pet}
				/>
			)}
		</section>
	);
};

export default EditPet;
