import dashStyle from "../Dashboard.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../utils/api";
import RoundedImage from "../../../layouts/roundedImage/RoundedImage";
import useFlashMessage from "../../../../hooks/useFlashMessage";

const MyPets = () => {
	const [pets, setPets] = useState([]);
	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {
		api.get("/pet/mypets")
			.then(({ data }) => {
				setPets(data.pets);
			})
			.catch(() => {});
	}, []);

	const removePet = (id) => {
		let message;
		let type;

		api.delete(`/pet/${id}`)
			.then(({ data }) => {
				message = data.message;
				type = "success";
				const updatedList = pets.filter((pet) => pet._id !== id);
				setPets(updatedList);
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

	const concludeAdoption = (id) => {
		let message;
		let type;

		api.patch(`/pet/${id}/conclude`)
			.then(({ data }) => {
				message = data.message;
				type = "success";
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
		<section>
			<div className={dashStyle.petlist_header}>
				<h1>Meus Pets</h1>
				<Link to="/pet/add">Cadastrar Pet</Link>
			</div>
			<div className={dashStyle.petlist_container}>
				{pets.length ? (
					pets.map((pet) => (
						<div className={dashStyle.petlist_row} key={pet._id}>
							<RoundedImage
								src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
								alt={pet.name}
								width={"px100"}
							/>
							<span className="bold">{pet.name}</span>
							<div className={dashStyle.actions}>
								{pet.available ? (
									<>
										{pet.adopter && (
											<button
												className={dashStyle.conclude_btn}
												onClick={() => concludeAdoption(pet._id)}
											>
												Concluir Adoção
											</button>
										)}
										<Link to={`/pet/${pet._id}/edit`}>Editar</Link>
										<button onClick={() => removePet(pet._id)}>Excluir</button>
									</>
								) : (
									<p>Pet já adotado</p>
								)}
							</div>
						</div>
					))
				) : (
					<h2>Não há Pets cadastrados!</h2>
				)}
			</div>
		</section>
	);
};

export default MyPets;
