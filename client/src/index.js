import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "../../client/src/config";

const { auth0_domain, clientId } = config;

ReactDOM.render(
  <Auth0Provider
    domain={auth0_domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
