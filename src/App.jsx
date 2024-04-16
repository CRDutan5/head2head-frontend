import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import About from "./Components/About";
import NewMatchForm from "./Components/DevelopingMatchComponents/NewMatchForm";
import MatchDetails from "./Components/MatchDetailsComponent/MatchDetails";

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <div className="bg-gradient-to-b from-neutral-50 to-blue-800 ">
        <NavBar
          handleLogout={handleLogout}
          toggleLogin={toggleLogin}
          setToggleLogin={setToggleLogin}
        />

        <Routes>
          <Route path="/" element={<LandingPage toggleLogin={toggleLogin} />} />
          <Route
            path="/login"
            element={<Login setToggleLogin={setToggleLogin} />}
          />
          <Route
            path="/register"
            element={<Register setToggleLogin={setToggleLogin} />}
          />
          <Route path="/aboutdev" element={<About />} />

          <Route element={<ProtectedRoute />}>
            {/* Place protected routes here */}
            <Route
              path="/dashboard"
              element={<Dashboard handleLogout={handleLogout} />}
            />
            <Route
              path="/dashboard/match/:id/edit"
              element={<NewMatchForm />}
            />
            <Route path="/dashboard/match/:id" element={<MatchDetails />} />
            <Route path="/dashboard/match/create" element={<NewMatchForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
