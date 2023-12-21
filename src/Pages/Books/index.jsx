/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../../config";

const Books = () => {
	const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState("relevance"); //Setting the default sort to relevance which is what the Google Books API works off of
    const [startIndex, setStartIndex] = useState(0);
    const location = useLocation();
    let data;

    // Function to sort the results based on relevance or newest (the only two forms of sorting supported by the Google Books API according to the docs)
    const handleSort = (e) => {
        setSort(e.target.value); 
    }

    // Function to allow the user to see more results
    const handlePageClick = () => {
        console.log(startIndex)
        let newIndex = startIndex + 40;
        console.log(newIndex)
        setStartIndex(newIndex);
        getMoreBooks();
    }

    // Fetch call used to get the search results whenever the user submits a new search or sort
	const getBooks = async () => {
		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${location.state.searchTerm}&orderBy=${sort}&startIndex=${startIndex}&maxResults=40&key=${config.GOOGLE_API_KEY}`
			);
			data = await response.json();
			setBooks(data.items);
            setIsLoading(false);
            return data
		} catch (err) {
			console.log(err);
		}
	};

    // Fetch call used to get more results from the Google Books API (I would like to refactor this into the getBooks function
    // to keep the code DRY, probably through a conditional based off the button that was pressed but I wasn't sure how to do that. Maybe after the MERN-stack refactor it would be easier to implement)
    const getMoreBooks = async () => {
        try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${location.state.searchTerm}&orderBy=${sort}&startIndex=${startIndex}&maxResults=40&key=${config.GOOGLE_API_KEY}`
			);
			data = await response.json();
			setBooks(books.concat(data.items)); //concatenating the new results to the existing array of books so the display gets updated without overriding the already present results
            setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getBooks();
	}, [sort]); //My sort function only seemed to work properly when I placed the sort variable here instead of leaving it empty like usual and I'm not sure why that is



	const loading = () => (
		<div className="m-auto text-center">
			<h1>Loading</h1>
		</div>
	);

	const loaded = () => (
        <div>
            {/* Google Books map */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 m-20">
			{books.map((book, idx) => (
                <div className="m-auto text-center" key={idx}>
                    <Link to={`/books/${book.id}`}>
                    {/* Ternary to either display the cover image of the book or a stock "No image available" photo if the book doesn't have a cover image in the array*/}
                    <div className="flex justify-center items-center hover:scale-125">
                    {book.volumeInfo.imageLinks === undefined ? <img className="shadow-xl shadow-black w-1/4" src="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" alt={book.volumeInfo.title} /> : <img className="shadow-xl shadow-black" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> }
					</div>
                    <h2 className="sm:text-s font-semibold pt-7">{book.volumeInfo.title}</h2>
                    </Link>
                    <h3 className="pb-10">{book.volumeInfo.authors}</h3>
				</div>
			))}
            </div>
            <div className="flex justify-center items-center pb-10">
                <button 
                className="border-2 border-gray-400 rounded-full p-2 bg-white hover:bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 hover:text-white" 
                onClick={()=> handlePageClick()}>See More Results</button>
            </div>
		</div>
	);

    return (
        <div>
            <div className="flex-col text-center">
            <form className="pt-3">
            Sort By: 
                <select className="font-semibold" onChange={handleSort} default="relevance"> {/* Calls on the sort function and adjusts the displayed results based off the desired method */}
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                </select>
            </form>
            <h1 className="font-extrabold">Results for &quot;{location.state.searchTerm}&quot;: </h1>
            </div>
            {isLoading ? loading() : loaded()}
        </div>
    );
};

export default Books;
