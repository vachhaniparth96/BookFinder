import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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
		refreshPage();
	};

    const responseMessage = (response) => {
        console.log(response);
    }

    const errorMessage = (error) => {
        console.log(error);
    }

	return (
		<div>
			<div className="flex justify-between">
				<h1>Title Will Go Here</h1>
				<GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for a book or author"
					/>
					<button type="submit">Search</button>
				</form>
			</div>
		</div>
	);
};

export default Header;
