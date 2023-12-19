import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
        const { id } = useParams();
        const [book, setBook] = useState(null);

        const getBook = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes/${id}`
                );
                const data = await response.json();
                setBook(data);
            } catch (err) {
                console.log(err);
            }
        }

        useEffect(() => {
            getBook();
        }, []);

        console.log(book);

        const loading = () => (
            <div>
                <h1>Loading...</h1>
            </div>
        );

        const loaded = () => (
            <div> {/* Adding all detail information that may be relevant to show. Comment/Uncomment lines as needed */}
                <h1>{book.volumeInfo.title}</h1>
                <h2>{book.volumeInfo.authors}</h2>
                <h2>{book.volumeInfo.publisher}</h2>
                <h2>{book.volumeInfo.publishedDate}</h2>
                <div className="flex w-1/12">
                    {book.volumeInfo.imageLinks === undefined ? <img src="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" alt={book.volumeInfo.title} /> : <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> }
                </div>
                {/* <p>{book.volumeInfo.maturityRating}</p> */}
                {/* { markup = {__html: book.volumeInfo.description};} */}
                <div dangerouslySetInnerHTML={{__html: book.volumeInfo.description}}>
                {/* <p>{book.volumeInfo.description}</p> */}
                </div>
                <h3>Average rating: {book.volumeInfo.averageRating} stars by {book.volumeInfo.ratingsCount} readers</h3>
                    {/* {book.volumeInfo.categories.map((category, idx) => (
                        <h3 key={idx}>{category}</h3>
                    ))} */}
                {book.volumeInfo.industryIdentifiers.map((isbn, idx) => (
                    <h3 key={idx}>{isbn.type}: {isbn.identifier}</h3>
                ))}

            </div>
        );

        return (
            <>
                {book ? loaded() : loading()}
            </>
        );
}

export default BookDetails