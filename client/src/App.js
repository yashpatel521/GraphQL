import "./App.css";
import { useRoutes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { routes } from "./routes";

function App() {
  const userAuth = localStorage.Token;
  const routing = useRoutes(routes(userAuth));
  return (
    <div>
      <NavBar />
      {routing}
    </div>
  );
}

export default App;
