import footerStyle from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyle.footer}>
      <p>
        <span className="bold">Get A Pet</span> &copy; 2021
      </p>
    </footer>
  );
};

export default Footer;
