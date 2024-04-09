import { Link } from "react-router-dom";
import Register from "./Register";

function LandingPage() {
  return (
    // <div style={{ textAlign: "center", marginTop: 100 }}>
    //   <h1>This is Your Landing Page</h1>

    //   <h3>
    //     Dashboard is a protected component. If you are not logged in and you try
    //     to navigate to the component you will be sent to the Login Page. Try It!
    //   </h3>
    //   <Link to="/dashboard">Dashboard</Link>
    // </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white h-screen col-span-2 flex justify-center items-center border-4 border-black">
        <div className="bg-white h-2/4 w-3/4 rounded-lg">
          <img
            src="images/landingpage.jpg"
            className="object-cover w-full h-full rounded-lg"
            alt="image of soccer balls"
          />
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center ">
        <Register />
      </div>
    </div>
  );
}

export default LandingPage;
