import { Link } from "react-router-dom";
import Register from "./Register";
import { useEffect } from "react";
import Login from "./Login";

function LandingPage({ toggleLogin }) {
  return (
    <div className="grid grid-cols-3 gap-4 h-screen">
      <div className="col-span-2 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img
            src="images/pickup-soccer.jpeg"
            className="object-cover w-4/6 h-2/4 rounded-lg mb-4"
            alt="image of soccer balls"
          />
          <p className="text-center w-5/6 font-extrabold bg-amber-500 border-2 border-black p-5 rounded-xl">
            Introducing H2H, the essential soccer app that brings enthusiasts
            together to enjoy the beautiful game. With H2H, you can easily
            organize and join 6v6 matches, complete with predetermined
            positions, ensuring a smooth and fun experience. It's more than just
            playing soccer; it's about community, skill improvement, and shared
            joy. Lace up your boots and get ready to make unforgettable moments
            on the pitch with H2H. Let's play!
          </p>
        </div>
      </div>
      {!toggleLogin ? (
        <div className="flex justify-center items-center">
          <Register />
        </div>
      ) : (
        <div className="col-span-1">
          <Login />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
