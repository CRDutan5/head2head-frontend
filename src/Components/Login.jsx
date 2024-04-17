import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// const URL = import.meta.env.VITE_BASE_URL;
const URL = "http://localhost:3003";

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "user1", password: "password1" };
    postFetch(user);
  }

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ textAlign: "center" }}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex flex-col">
              <label htmlFor="username" className="flex justify-start">
                Username
              </label>
              <input
                id="username"
                value={user.username}
                type="text"
                placeholder="username"
                autoComplete="username"
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md my-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="flex justify-start">
                Password{" "}
              </label>
              <input
                id="password"
                value={user.password}
                type="password"
                placeholder="password"
                onChange={handleChange}
                autoComplete="current-password"
                className="border border-gray-300 p-2 rounded-md my-2"
              />
            </div>
          </div>
          <button
            className="border-black border-2 m-1 px-4 py-2 rounded-lg bg-amber-500 hover:font-bold"
            onClick={handleDemoSignIn}
          >
            Demo User
          </button>
          <button className="border-black border-2 m-1 px-4 py-2 rounded-lg bg-amber-500 hover:font-bold">
            Submit
          </button>
        </form>
        <p>
          No Account?{" "}
          <Link
            to="/register"
            className="text-amber-500 border-b-2 border-amber-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
