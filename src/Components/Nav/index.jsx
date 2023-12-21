import { Link } from "react-router-dom";
import Login from "../Login";
const Nav = () => {
    return (
        <div>
            <div className="flex justify-around mx-10 text-center py-5">
                <div className="hover:underline">
                <Link to="/">Home</Link>
                </div>
                <Login />
            </div>
        </div>
    );
}

export default Nav;