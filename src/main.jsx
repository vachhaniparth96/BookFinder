import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<GoogleOAuthProvider clientId="920647848413-l3qou40fccmtfnv10d03qpj5k661cou9.apps.googleusercontent.com">
		<Router>
			<App />
		</Router>
	</GoogleOAuthProvider>
);
