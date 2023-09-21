import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "http://localhost:8080/realms/keycloak-sample",
  client_id: "web-react",
  redirect_uri: "http://localhost:5173",
  // ...
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
