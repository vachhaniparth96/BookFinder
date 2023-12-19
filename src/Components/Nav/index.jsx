import { Link } from "react-router-dom";
import Login from "../Login";
const Nav = () => {
    return (
        <div>
            <div className="flex justify-around">
                <Link to="/">Home</Link>
                <Link to="/user/:id">Account</Link>
                <Login />
            </div>
        </div>
    );
}

export default Nav;