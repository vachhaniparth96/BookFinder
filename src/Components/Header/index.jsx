import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { FaSearch } from "react-icons/fa";
import { MdOutlineSurfing } from "react-icons/md";
import '@fontsource/rampart-one';


const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const history = useNavigate();

	// Refresh page function that was necessary in order for the user to be able to make searches while on the search results page
	const refreshPage = () => {
		history(0);
	};

	// Search function
	const handleSubmit = (e) => {
		e.preventDefault();
		history("/books", {
			state: {
				searchTerm: searchTerm,
			},
		});
		refreshPage();
	};

	return (
		<div className="bg-gradient-to-b from-blue-900 via-cyan-400 to-blue-50 p-20 box sticky top-0 z-10">
			<div>
				<h1 className="font-rampart flex justify-center items-center text-white text-center text-5xl">Shelf Surfer <MdOutlineSurfing /></h1>
                <Nav />
			</div>
			<div className="flex justify-center">
				<form className="flex" onSubmit={handleSubmit}>
					<input
						className="border-2 border-gray-400 rounded-md p-2 w-60"
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for a book or author"
					/>
					<button
						className="flex w-30 border-2 border-gray-400 rounded-md p-2 bg-white hover:bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900"
						type="submit"><FaSearch size="1.5rem"/></button>
				</form>
			</div>
		</div>
	);
};

export default Header;
