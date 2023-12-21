/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

const BookDetails = () => {
        const { id } = useParams();
        const [book, setBook] = useState(null);
        const [pageTurned, setPageTurned] = useState(false);

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
            <CSSTransition in={pageTurned} timeout={1000} classNames="page-turn">
            <div className="page-turn">
            <div className="text-center py-5"> {/* Adding all detail information that may be relevant to show. Comment/Uncomment lines as needed */}
                <h1 className="text-2xl font-bold">{book.volumeInfo.title}</h1>
                <h2 className="text-xl italic">Author(s):
						{book.volumeInfo.authors.map((author, idx) => (
							<h3 key={idx}>{author}</h3>
						))}
					</h2>
                <h2>Publisher:&nbsp;{book.volumeInfo.publisher}</h2>
                <h2>Publish Date:&nbsp;{book.volumeInfo.publishedDate}</h2>
                <div className="flex justify-center items-center p-5">
                    {book.volumeInfo.imageLinks === undefined ? <img src="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" alt={book.volumeInfo.title} /> : <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> }
                </div>
                {/* <p>{book.volumeInfo.maturityRating}</p> */}
                {/* { markup = {__html: book.volumeInfo.description};} */}
                <h3 className="text-xl">Average rating:&nbsp;
                    {book.volumeInfo.averageRating ? `${book.volumeInfo.averageRating} stars by ${book.volumeInfo.ratingsCount} readers` : "No ratings yet"}
                </h3>
                <div className="m-auto mx-12 md:mx-48 lg:mx-72 xl:mx-96 text-xl text-center" dangerouslySetInnerHTML={{__html: book.volumeInfo.description}}>
                {/* <p>{book.volumeInfo.description}</p> */}
                </div>
                    {/* {book.volumeInfo.categories.map((category, idx) => (
                        <h3 key={idx}>{category}</h3>
                    ))} */}
                {book.volumeInfo.industryIdentifiers.map((isbn, idx) => (
                    <h3 key={idx}>{isbn.type}: {isbn.identifier}</h3>
                ))}
            </div>
            </div>
            </CSSTransition>
        );

        return (
            <div>
                {book ? loaded() : loading()}
            </div>
        );
}

export default BookDetails