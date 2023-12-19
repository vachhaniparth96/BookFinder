import React, { useState, useEffect } from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (res) => setUser(res),
        onError: (err) => {console.log('Login Failed: ', err)},
        });

        useEffect(() => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: "application/json"
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }, [user]);
console.log(user, "User")
console.log(profile, "Profile")
        const logout = () => {
            googleLogout({clientId: "920647848413-l3qou40fccmtfnv10d03qpj5k661cou9.apps.googleusercontent.com"});
            setUser(null);
            setProfile(null);
        }

        const responseMessage = (response) => {
            console.log(response);
        }
    
        const errorMessage = (error) => {
            console.log(error);
        }
        return (
            <div>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logout}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google </button>
            )}
        </div>
            // <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        )

    }

    export default Login;