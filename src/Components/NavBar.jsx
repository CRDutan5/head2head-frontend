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
    <div className="bg-gradient-to-b from-slate-700 to-slate-400 shadow-xl flex justify-between items-center font-semibold p-5 border-b-dotted ">
      <div>
        <div className="flex">
          <div className="flex items-center">
            <Link to="/" className="text-3xl m-2 text-white">
              H2H
            </Link>
          </div>
          <div className="flex items-center">
            <SoccerBall />
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        {toggleLogin && (
          <h2 className="mr-6 text-xl hover:border-b-2 border-gray-200">
            <Link to="/dashboard" className=" text-white  ">
              All Games
            </Link>
          </h2>
        )}
        <h2 className="mr-6 text-xl text-white hover:border-b-2 border-gray-200  ">
          <Link to="/aboutdev">About the Dev</Link>
        </h2>
        {!toggleLogin ? (
          <Link
            to="/login"
            className="text-xl text-white hover:border-b-2 border-gray-200 "
          >
            Login
          </Link>
        ) : (
          <div className="text-xl text-white ">
            {user && <span>Welcome, {user.first_name} | </span>}
            <Link
              to="/"
              onClick={handleLogout}
              className="hover:border-b-2 border-gray-200"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
