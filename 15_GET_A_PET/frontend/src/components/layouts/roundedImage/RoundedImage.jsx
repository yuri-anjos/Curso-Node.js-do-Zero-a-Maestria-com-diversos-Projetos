import style from "./RoundedImage.module.css";

const RoundedImage = ({ src, alt, width }) => {
  return (
    <img
      className={`${style.rounded_image} ${style[width]}`}
      src={src}
      alt={alt}
    />
  );
};

export default RoundedImage;
