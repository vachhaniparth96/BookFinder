import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { FaSearch } from "react-icons/fa";

const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const history = useNavigate();


	const refreshPage = () => {
		history(0);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		history("/books", {
			state: {
				searchTerm: searchTerm,
			},
		});
		// refreshPage();
	};

	return (
		<div>
			<div>
				<h1 className="text-center text-3xl">Title Will Go Here</h1>
                <Nav />
			</div>
			<div className="flex justify-center">
				<form className="" onSubmit={handleSubmit}>
					<input
						className="border-2 border-gray-400 rounded-md p-2 w-60"
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for a book or author"
					/>
					<button
						className="border-2 border-gray-400 rounded-md p-2 bg-white hover:bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900"
						type="submit"><FaSearch size="1.5rem"/></button>
				</form>
			</div>
		</div>
	);
};

export default Header;
