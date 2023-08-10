import dashStyle from "../Dashboard.module.css";

import { useEffect, useState } from "react";
import api from "../../../../utils/api";
import RoundedImage from "../../../layouts/roundedImage/RoundedImage";
import { Buffer } from "buffer";

const MyAdoptions = () => {
	const [pets, setPets] = useState([]);

	useEffect(() => {
		getPets();
	}, []);

	const getPets = () => {
		api.get("/pet/myadoptions")
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

	return (
		<section>
			<div className={dashStyle.petlist_header}>
				<h1>Minhas Adoções</h1>
			</div>
			<div className={dashStyle.petlist_container}>
				{pets.length ? (
					pets.map((pet, index) => (
						<div key={index} className={dashStyle.petlist_row}>
							<RoundedImage src={pet.photo} alt={pet.name + index} width={"px100"} />
							<span className="bold">{pet.name}</span>
							<div className={dashStyle.contact}>
								<p>
									<span className="bold">Ligue para: </span> {pet.user.phone}
								</p>
								<p>
									<span className="bold">Fale com: </span> {pet.user.name}
								</p>
							</div>
							<div className={dashStyle.actions}>
								{pet.available ? (
									<p>Adoção em processo.</p>
								) : (
									<p>Parabén por concluir a adoção!</p>
								)}
							</div>
						</div>
					))
				) : (
					<h2>Não há Adoções!</h2>
				)}
			</div>
		</section>
	);
};

export default MyAdoptions;
