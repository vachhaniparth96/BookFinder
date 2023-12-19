
import { useEffect, useState } from "react";


const Home = () => {
    const [bestSellers, setBestSellers] = useState(null); 
    const getBestSellers = async () => {
        try{
            const response = await fetch(
                `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=2F3wpNtKBnaGUi39xzBudafBByjUYYnR` //replace API key with process.env if refactoring code
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
            <h1>Current NYT Best Sellers: </h1>
            {bestSellers ? (
                <div>
                    {bestSellers.results.books.map((book, idx) => (
                        <div key={idx}>
                            <h2>{book.title}</h2>
                            <h3>{book.author}</h3>
                            <img src={book.book_image} alt={book.title} />
                            <h3>{book.description}</h3>
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