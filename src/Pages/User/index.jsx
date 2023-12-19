import { useParams } from 'react-router-dom';
import  Login  from '../../Components/Login';
import { useContext } from 'react';

const User = () => {
    const id = useParams();
    console.log(id, "ID")

    const profile = useContext({Login});
    console.log(profile, "Profile")
    return (
        <div>
            <h1>Profile Info</h1>
        </div>
    )
}

export default User;