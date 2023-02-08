import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/Redux/Store/Index";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./Componets/Theme";
import axios from "axios";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
axios.defaults.baseURL = "https://backanimals-production.up.railway.app";
//axios.defaults.baseURL = "http://localhost3001/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<Auth0Provider
		domain={domain}
		clientId={clientID}
		authorizationParams={{
			redirect_uri: "https://buddyong.vercel.app/createAuth0",
		}}>
		<Provider store={store}>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</BrowserRouter>
		</Provider>
	</Auth0Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
