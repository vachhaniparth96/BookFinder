import { Routes, Route } from "react-router-dom";

import Books from "../../Pages/Books";
import Home from "../../Pages/Home";
import BookDetails from "../../Pages/BookDetails";
import User from "../../Pages/User";

const Main = () => {
	return (
		<div className="bg-amber-100">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books" element={<Books />} />
				<Route path="/books/:id" element={<BookDetails />} />
                <Route path="/user/:id" element={<User />} />
			</Routes>
		</div>
	);
}

export default Main;
