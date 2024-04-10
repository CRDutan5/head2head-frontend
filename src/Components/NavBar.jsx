import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <h2>
          <Link to="/" className="text-3xl m-2">
            Head2Head
          </Link>
        </h2>
      </div>
      <div className="flex items-center">
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
