import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../../config";

const Books = () => {
	const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState("relevance");
    const [startIndex, setStartIndex] = useState(0);
    const location = useLocation();
    let data;

    const handleSort = (e) => {
        setSort(e.target.value); 
    }

    const handlePageClick = (e) => {
        console.log(startIndex)
        let newIndex = startIndex + 40;
        console.log(newIndex)
        setStartIndex(newIndex);
        getMoreBooks();
    }

    console.log(sort);
    console.log(location.state.searchTerm);

	const getBooks = async () => {
		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${location.state.searchTerm}&orderBy=${sort}&startIndex=${startIndex}&maxResults=40&key=${config.GOOGLE_API_KEY}`
			);
            // const response = await fetch(`https://openlibrary.org/search.json?q=${location.state.searchTerm}&limit=40`);
			data = await response.json();
			setBooks(data.items);
            setIsLoading(false);
            return data
		} catch (err) {
			console.log(err);
		}
	};

    const getMoreBooks = async () => {
        try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${location.state.searchTerm}&orderBy=${sort}&startIndex=${startIndex}&maxResults=40&key=${config.API_KEY}`
			);
            // const response = await fetch(`https://openlibrary.org/search.json?q=${location.state.searchTerm}&limit=40`);
			data = await response.json();
			setBooks(books.concat(data.items));
            setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getBooks();
	}, [sort]);
	console.log(books, location.state.searchTerm);
    // books.items.forEach((book) => console.log(book.volumeInfo.imageLinks));


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
                    <div className="flex justify-center items-center hover:scale-125">
                    {book.volumeInfo.imageLinks === undefined ? <img className="shadow-xl shadow-black w-1/4"src="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" alt={book.volumeInfo.title} /> : <img className="shadow-xl shadow-black" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> }
                    {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> : <img src="https://pub111.com/wp-content/plugins/post-slider-carousel/images/no-image-available-grid.jpg" alt={book.volumeInfo.title} />} */}
					</div>
                    <h2 className="sm:text-s font-semibold pt-7">{book.volumeInfo.title}</h2>
                    </Link>
                    <h3 className="pb-10">{book.volumeInfo.authors}</h3>
				</div>
			))}
            </div>
            <div className="flex justify-center items-center pb-10">
                <button 
                className="border-2 border-gray-400 rounded-md p-2 bg-white hover:bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 hover:text-white" 
                onClick={()=> handlePageClick()}>See More Results</button>
            </div>
		</div>
	);

    return (
        <div>
            <div className="flex-col text-center">
            <form className="pt-3"> {/*onSubmit={handleSubmit}*/}
            Sort By: 
                <select className="font-semibold" onChange={handleSort} default="relevance"> {/*onChange={handleSort}*/}
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                </select>
            </form>
            <h1 className="font-extrabold">Results for &quot;{location.state.searchTerm}&quot;: </h1>
            </div>
            {/* {books ? console.log("loaded") : console.log("loading")} */}
            {isLoading ? loading() : loaded()}
        </div>
    );
};

export default Books;
