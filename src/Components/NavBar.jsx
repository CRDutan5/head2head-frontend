import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SoccerBall from "../../images/SoccerBall";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, setToggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToggleLogin(true);
      fetch(`${URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [toggleLogin]);

  return (
    <div className="border-black border-2 flex justify-between items-center  font-bold p-5">
      <div>
        <div className="flex">
          <div className="flex items-center">
            <Link to="/" className="text-3xl m-2">
              H2H
            </Link>
          </div>
          <div className="flex items-center">
            <SoccerBall />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {toggleLogin && (
          <h2 className="mr-6 text-xl">
            <Link to="/dashboard">Dashboard</Link>
          </h2>
        )}
        <h2 className="mr-6 text-xl">
          <Link to="/aboutdev">About the Dev</Link>
        </h2>
        {!toggleLogin ? (
          <Link to="/login" className="text-xl">
            Login
          </Link>
        ) : (
          <div className="text-xl">
            {user && <span>Hello, {user.first_name.toUpperCase()} | </span>}
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
