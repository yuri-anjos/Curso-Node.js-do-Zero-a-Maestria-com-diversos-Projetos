import headerStyle from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";

const Header = () => {
	const { authenticated, logout } = useContext(UserContext);

	return (
		<header className={headerStyle.header}>
			<div className={headerStyle.header_logo}>
				<Link to="/">
					{" "}
					<img src={Logo} alt="Get A Pet Logo" />
				</Link>
				<h1>Get A Pet</h1>
			</div>
			<nav>
				<ul>
					<li>
						<Link to="/">Adotar</Link>
					</li>
					{authenticated ? (
						<>
							<li>
								<Link to="/pet/myadoptions">Minhas adoções</Link>
							</li>
							<li>
								<Link to="/pet/mypets">Meus Pets</Link>
							</li>
							<li>
								<Link to="/user/profile">Perfil</Link>
							</li>
							<li onClick={logout}>Sair</li>
						</>
					) : (
						<>
							<li>
								<Link to="/login">Entrar</Link>
							</li>
							<li>
								<Link to="/register">Cadastrar</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
