import { Link } from "react-router-dom";
import Register from "./Register";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function LandingPage({ toggleLogin }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className=" h-screen col-span-2 flex justify-center items-center ">
        <div className="bg-white h-2/4 w-3/4 rounded-lg">
          <img
            src="images/landingpage.jpg"
            className="object-cover w-full h-full rounded-lg"
            alt="image of soccer balls"
          />
        </div>
      </div>
      {!toggleLogin && (
        <div className="col-span-1 flex justify-center items-center ">
          <Register />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
