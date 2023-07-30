import style from "./Select.module.css";

const Select = ({ text, name, options, handleOnChange, value }) => {
	return (
		<div className={style.form_control}>
			<label htmlFor={name}>{text}:</label>
			<select
				name={name}
				id={name}
				onChange={handleOnChange}
				value={value || ""}
			>
				<option value="">Selecione uma Opção:</option>
				{options.map((val, index) => (
					<option value={val} key={index}>
						{val}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
