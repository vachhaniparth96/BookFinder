import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null); //migrate into app and make avail through context (Icebox feature, may not even need to worry about it if I refactor the app into a full MERN stack)

    //function to allow the user to log in through google
	const login = useGoogleLogin({
		onSuccess: (res) => setUser(res),
		onError: (err) => {
			console.log("Login Failed: ", err);
		},
	});

	useEffect(() => {
        //if user is logged in, get their profile info and set it to the profile variable
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
    
    //function to allow the user to log out
	const logout = () => {
		googleLogout({
            clientId:
				"920647848413-l3qou40fccmtfnv10d03qpj5k661cou9.apps.googleusercontent.com",
            });
		setUser(null);
		setProfile(null);
	};

	return (
		<div className="border-2 border-gray-500 rounded-lg">
			{profile ? (
				<div>
					<button className="flex rounded-lg px-2 bg-white hover:bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 hover:text-white" onClick={logout}>Log out</button>
				</div>
			) : (
				<button className="flex rounded-lg px-2 bg-white hover:bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 hover:text-white" onClick={() => login()}><FcGoogle size="23px"/>&nbsp;Login</button>
			)}
		</div>
	);
};

    export default Login;