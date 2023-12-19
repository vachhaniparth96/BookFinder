import { Routes, Route } from "react-router-dom";

import Books from "../../Pages/Books";
import Home from "../../Pages/Home";
import BookDetails from "../../Pages/BookDetails";

const Main = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books" element={<Books />} />
				<Route path="/books/:id" element={<BookDetails />} />
			</Routes>
		</div>
	);
}

export default Main;
