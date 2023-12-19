import { useState, useEffect, useContext, createContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";
import User from "../../Pages/User";


/**
 * Login component that handles Google OAuth login flow.
 * Manages user and profile state, makes API call to get user profile on successful login.
 * Provides profile context to child components.
 * Handles logout by clearing state.
 */
const Login = () => {
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null); //migrate into app and make avail through context
	const profileContext = createContext();

	const login = useGoogleLogin({
		onSuccess: (res) => setUser(res),
		onError: (err) => {
			console.log("Login Failed: ", err);
		},
	});

	useEffect(() => {
		if (user) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${user.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					setProfile(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [user]);

	console.log(profile, "Profile");
    
	const logout = () => {
		googleLogout({
            clientId:
				"920647848413-l3qou40fccmtfnv10d03qpj5k661cou9.apps.googleusercontent.com",
            });
		setUser(null);
		setProfile(null);
	};
	return (
		<div>
            
                <profileContext.Provider value={profile}>
                    {console.log(profileContext, "Profile Context")}
                    <User />
                </profileContext.Provider>;
			{profile ? (
				<div className="flex justify-between gap-10">
					<Link to={`user/${profile.id}`}>
						<p>Profile</p>
					</Link>
					{/* <h3>User Logged in</h3> */}
					{/* <p>Name: {profile.name}</p> */}
					{/* <p>Email Address: {profile.email}</p> */}
					<button onClick={logout}>Log out</button>
				</div>
			) : (
				<button onClick={() => login()}>Sign in with Google </button>
			)}
		</div>
	);
};

    export default Login;