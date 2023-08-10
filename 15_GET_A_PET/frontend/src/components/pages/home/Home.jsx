import style from "./Home.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { Buffer } from "buffer";

const Home = () => {
	const [pets, setPets] = useState([]);
	// const [page, setPage] = useState(1);
	// const pageSize = 5;

	useEffect(() => {
		getPets();
	}, []);

	const getPets = () => {
		api.get("/pet").then(({ data }) => {
			const pets = data.pets.map((pet) => {
				const buffer = Buffer.from(pet.images[0].data).toString("base64");
				const photo = `data:${pet.images[0].contentType};base64,${buffer}`;
				pet.photo = photo;

				return pet;
			});

			setPets(pets);
		});
	};
	return (
		<section>
			<div className={style.pet_home_header}>
				<h1>Adote um Pet</h1>
				<p>Veja os detalhes de cada um e conheça o tutor deles!</p>
			</div>
			<div className={style.pet_home_list}>
				{pets.length ? (
					pets.map((pet, index) => (
						<div className={style.pet_home_item} key={index}>
							<img
								className={style.pet_home_item_image}
								src={pet.photo}
								alt={pet.name}
							/>
							<h3>{pet.name}</h3>
							<p>
								<span className="bold">Peso: </span> {pet.weigth}kg
							</p>
							{pet.available ? (
								<Link to={`/pet/${pet._id}`}>Mais Detalhes</Link>
							) : (
								<p className={style.adopted_text}>Adotado</p>
							)}
						</div>
					))
				) : (
					<p>Não há pets disponíveis no momento!</p>
				)}
			</div>
		</section>
	);
};

export default Home;
