import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Books = () => {
	const [books, setBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState("relevance");
    const location = useLocation();

    const handleSort = (e) => {
        setSort(e.target.value); 
    }

    console.log(sort);
    console.log(location.state.searchTerm);

	const getBooks = async () => {
		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${location.state.searchTerm}&orderBy=${sort}&startIndex=0&maxResults=40`
			);
            // const response = await fetch(`https://openlibrary.org/search.json?q=${location.state.searchTerm}&limit=40`);
			const data = await response.json();
			setBooks(data);
            setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getBooks();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sort]);
	console.log(books, location.state.searchTerm);
    // books.items.forEach((book) => console.log(book.volumeInfo.imageLinks));

	const loading = () => (
		<div>
			<h1>Loading</h1>
		</div>
	);

	const loaded = () => (
		<div>
            {/* Google Books map */}
            <div className="grid grid-cols-5 grid-rows-4 m-20">
			{books.items.map((book, idx) => (
				<div className="w-1/3"key={idx}>
                    <Link to={`/books/${book.id}`}>
                    {book.volumeInfo.imageLinks === undefined ? <img src="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" alt={book.volumeInfo.title} /> : <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> }
                    {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> : <img src="https://pub111.com/wp-content/plugins/post-slider-carousel/images/no-image-available-grid.jpg" alt={book.volumeInfo.title} />} */}
					<h2 className="text-xs font-semibold">{book.volumeInfo.title}</h2>
                    </Link>
                    <h3 className="text-xs pb-10">{book.volumeInfo.authors}</h3>
				</div>
			))}
            </div>

            {/* OpenLibrary map */}
            {/* {books.docs.map((book, idx) => (
                <div key={idx}>
                    <Link to={`/books/${book.key}`}>
                    <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />
                        <h2>{book.title}</h2>
                    </Link>
                    <h3>{book.author_name}</h3>
                </div>
            ))} */}
		</div>
	);

	return (
		<div>
            <form> {/*onSubmit={handleSubmit}*/}
            Sort By: 
                <select onChange={handleSort} default="relevance"> {/*onChange={handleSort}*/}
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                </select>
            </form>
			<h1>Results for "{location.state.searchTerm}": </h1>
			{/* {books ? console.log("loaded") : console.log("loading")} */}
			{isLoading ? loading() : loaded()}
		</div>
	);
};

export default Books;
