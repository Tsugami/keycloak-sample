import { useAuth } from "react-oidc-context";
import { Todos } from "./Todos";

function App() {
    const auth = useAuth();
    console.log(auth?.user?.profile);

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        Hello {auth.user?.profile.name}{" "}
            <button onClick={() => void auth.removeUser()}>Log out</button>
            <Todos/>
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default App;
