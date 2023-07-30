import { useState } from "react";
import formStyle from "../Form.module.css";
import style from "./PetForm.module.css";
import Input from "../input/Input";
import Select from "../select/Select";

const PetForm = ({ handleSubmit, petData, btnText }) => {
	const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

	const [pet, setPet] = useState(petData || {});
	const [preview, setPreview] = useState([]);

	const handleOnFileChange = (e) => {
		setPreview(Array.from(e.target.files));
		setPet({ ...pet, [e.target.name]: e.target.files });
	};

	const handleOnChange = (e) => {
		setPet({ ...pet, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		e.preventDefault();
		handleSubmit(pet);
	};

	return (
		<form className={formStyle.form_container} onSubmit={submit}>
			<div className={style.preview_pet_images}>
				{preview.length
					? preview.map((image, index) => (
							<img
								src={URL.createObjectURL(image)}
								alt={pet.name}
								key={index}
							/>
					  ))
					: pet.images?.length
					? pet.images.map((image, index) => (
							<img
								src={`${process.env.REACT_APP_API}/images/pets/${image}`}
								alt={pet.name}
								key={index}
							/>
					  ))
					: ""}
			</div>
			<Input
				text="Imagens do Pet"
				type="file"
				name="images"
				handleOnChange={handleOnFileChange}
				multiple={true}
			/>

			<Input
				text="Nome do Pet"
				type="text"
				name="name"
				placeholder="Digite o nome do Pet"
				value={pet.name || ""}
				handleOnChange={handleOnChange}
			/>

			<Input
				text="Idade do Pet"
				type="text"
				name="age"
				placeholder="Digite a idade do Pet"
				value={pet.age || ""}
				handleOnChange={handleOnChange}
			/>

			<Input
				text="Peso do Pet"
				type="number"
				name="weigth"
				placeholder="Digite o peso do Pet"
				value={pet.weigth || ""}
				handleOnChange={handleOnChange}
			/>

			<Select
				text="Cor do Pet"
				name="color"
				options={colors}
				value={pet.color || ""}
				handleOnChange={handleOnChange}
			/>
			<input type="submit" value={btnText} />
		</form>
	);
};

export default PetForm;
