
import { useEffect, useState } from "react";
import config from "../../config";


const Home = () => {
    const [bestSellers, setBestSellers] = useState(null); 
    const getBestSellers = async () => {
        try{
            const response = await fetch(
                `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${config.NYTIMES_API_KEY}` //replace API key with process.env if refactoring code
            );
            const data = await response.json();
            setBestSellers(data);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getBestSellers();
    }, []);

    return (
        <div>
            <h1 className="font-bold text-center mt-10">Current NYT Best Sellers: </h1>
            {bestSellers ? (
                <div className=" md:grid grid-cols-3">
                    {bestSellers.results.books.map((book, idx) => (
                        <div key={idx}>
                            <h2 className="font-semibold italic text-center">{book.title}</h2>
                            <h3 className="italic text-center">{book.author}</h3>
                            <img className="h-48 w-auto m-auto shadow-xl shadow-black" src={book.book_image} alt={book.title} />
                            <h3 className="text-center m-auto p-5">{book.description}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default Home;