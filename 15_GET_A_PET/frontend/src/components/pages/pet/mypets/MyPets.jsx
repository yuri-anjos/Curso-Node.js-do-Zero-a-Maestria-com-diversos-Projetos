import dashStyle from "../Dashboard.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../utils/api";
import RoundedImage from "../../../layouts/roundedImage/RoundedImage";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import { Buffer } from "buffer";

const MyPets = () => {
	const [pets, setPets] = useState([]);
	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {
		getPets();
	}, []);

	const getPets = () => {
		api.get("/pet/mypets")
			.then(({ data }) => {
				const pets = data.pets.map((pet) => {
					const buffer = Buffer.from(pet.images[0].data).toString("base64");
					const photo = `data:${pet.images[0].contentType};base64,${buffer}`;
					pet.photo = photo;

					return pet;
				});

				setPets(pets);
			})
			.catch(() => {});
	};

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

	const refuseAdopter = (id) => {
		let message;
		let type;

		api.patch(`/pet/${id}/refuse-adopter`)
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
							<div className={dashStyle.pet_info}>
								<RoundedImage src={pet.photo} alt={pet.name} width={"px100"} />
								<span className="bold">{pet.name}</span>
							</div>
							<div className={dashStyle.actions}>
								{pet.available ? (
									<>
										{pet.adopter && (
											<>
												<button
													className={dashStyle.refuse_btn}
													onClick={() => refuseAdopter(pet._id)}
												>
													Rejeitar {pet.adopter.name}
												</button>
												<button
													className={dashStyle.conclude_btn}
													onClick={() => concludeAdoption(pet._id)}
												>
													Concluir Adoção
												</button>
											</>
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
