import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import About from "./about/About";
import "./App.css";
import Create from "./create/Create";
import Details from "./details/Details";
import Error from "./error/Error";
import Home from "./home/Home";
import Nav from "./nav/Nav";
import Update from "./update/Update";
import Signup from "./signup/Signup";
import Login from "./login/Login";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={
            // user ?
            <Create />
            //  : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/details/:id"
          element={user ? <Details /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/update/:uid"
          element={user ? <Update /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
