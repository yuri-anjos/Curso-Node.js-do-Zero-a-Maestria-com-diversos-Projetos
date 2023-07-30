import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Container from "./components/layouts/container/Container";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import Message from "./components/layouts/message/Message";
import Home from "./components/pages/home/Home";

import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Profile from "./components/pages/user/profile/Profile";
import MyPets from "./components/pages/pet/mypets/MyPets";
import AddPet from "./components/pages/pet/addpet/AddPet";
import EditPet from "./components/pages/pet/editPet/EditPet";
import PetDetails from "./components/pages/pet/petdetails/PetDetails";
import MyAdoptions from "./components/pages/pet/myadoptions/MyAdoptions";

function App() {
	return (
		<>
			<BrowserRouter>
				<UserProvider>
					<Header />
					<Message />
					<Container>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/user/profile" element={<Profile />} />
							<Route path="/pet/mypets" element={<MyPets />} />
							<Route path="/pet/myadoptions" element={<MyAdoptions />} />
							<Route path="/pet/add" element={<AddPet />} />
							<Route path="/pet/:id/edit" element={<EditPet />} />
							<Route path="/pet/:id" element={<PetDetails />} />
						</Routes>
					</Container>
					<Footer />
				</UserProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
