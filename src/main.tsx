import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0Config } from "./auth/auth0-config";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Auth0Provider
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    authorizationParams={{
      redirect_uri: auth0Config.redirectUri,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
