import Header from "./Components/Header";
import Main from "./Components/Main";
//import profile context here

const App = () => {
    // className="bg-gradient-to-b from-yellow-800 via-amber-600 to-yellow-500"
    return (
        <div className="bg-amber-100">
            <Header />
            <Main />
        </div>
    )
}

export default App;