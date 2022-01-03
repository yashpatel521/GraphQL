import Home from "./components/Home";
import CreateQuote from "./components/CreateQuote";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import OtherUserProfile from "./components/otherUserProfile";
import { Navigate } from "react-router-dom";

export const routes = (userAuth) => [
  { path: "/login", element: !userAuth ? <Login /> : <Navigate to="/" /> },
  { path: "/signup", element: !userAuth ? <Signup /> : <Navigate to="/" /> },

  { path: "/", element: userAuth ? <Home /> : <Navigate to="/login" /> },
  {
    path: "/profile",
    element: userAuth ? <Profile /> : <Navigate to="/login" />,
  },
  {
    path: "/createquote",
    element: userAuth ? <CreateQuote /> : <Navigate to="/login" />,
  },
  {
    path: "/profile/:userid",
    element: userAuth ? <OtherUserProfile /> : <Navigate to="/login" />,
  },
];
