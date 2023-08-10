import style from "./RoundedImage.module.css";
import { TiDelete } from "react-icons/ti";
import UserLogo from "../../../assets/user.png";

const RoundedImage = ({ src, alt, width, htmlFor, deletable, handleDelete }) => {
	return (
		<div className={`${style.rounded_image} ${style[width]}`}>
			{deletable ? (
				<>
					<TiDelete onClick={handleDelete} className={`${style.remove_image}`} />
				</>
			) : (
				<></>
			)}

			<label htmlFor={htmlFor}>
				<img
					className={`${style.rounded_image} ${style[width]}`}
					style={htmlFor && { cursor: "pointer" }}
					src={src || UserLogo}
					alt={alt}
				/>
			</label>
		</div>
	);
};

export default RoundedImage;
