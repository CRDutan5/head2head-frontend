import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      if (data.token) {
        // in case there is an old token in the browser, remove it
        localStorage.removeItem("token");
        // set the new user's JWT token in the browser
        localStorage.setItem("token", data.token);
        setToggleLogin(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
  return (
    <div className="max-w-md mx-auto">
      <h3 className="mb-4 text-xl flex justify-center">Register</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              value={user.firstName}
              type="firstName"
              placeholder="First Name"
              onChange={handleChange}
              // autoComplete="current-password"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name: </label>
            <input
              id="lastName"
              value={user.lastName}
              type="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              // autoComplete="current-password"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dob">Date of Birth: </label>
            <input
              id="dob"
              value={user.dob}
              type="dob"
              placeholder="Last Name"
              onChange={handleChange}
              // autoComplete="current-password"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              value={user.username}
              type="text"
              placeholder="Username"
              onChange={handleChange}
              autoComplete="username"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              value={user.email}
              type="email"
              placeholder="Email"
              onChange={handleChange}
              autoComplete="email"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              value={user.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="current-password"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-500 font-bold border-b-2 border-amber-500"
          >
            Click here to login!
          </Link>
        </p>
        <div className="flex justify-center">
          <button className="bg-amber-500 border-2 border-black py-2 px-4 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
