import style from "./Home.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

const Home = () => {
	const [pets, setPets] = useState([]);
	// const [page, setPage] = useState(1);
	// const pageSize = 5;

	useEffect(() => {
		api.get("/pet").then(({ data }) => {
			setPets([...data.pets]);
		});
	}, []);

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
							<div
								className={style.pet_home_item_image}
								style={{
									backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
								}}
							></div>
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
