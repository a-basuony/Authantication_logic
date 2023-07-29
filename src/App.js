import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      saveUserData();
    }
  }, []);

  const saveUserData = () => {
    let encodedToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };

  const ProtectedRoute = (props) => {
    if (userData) {
      return props.children;
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar userData={userData} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile userData={userData} />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login saveUserData={saveUserData} />} />
      </Routes>
    </>
  );
}

export default App;
