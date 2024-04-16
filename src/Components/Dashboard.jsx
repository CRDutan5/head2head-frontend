import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import MatchCard from "./DashboardComponents/MatchCard";
import PlayerCard from "./DashboardComponents/PlayerCard";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const URL = import.meta.env.VITE_BASE_URL;

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`${URL}/api/match`)
      .then((res) => res.json())
      .then((data) => {
        data.sort(
          (a, b) => new Date(a.start_datetime) - new Date(b.start_datetime)
        );
        setMatches(data);
      });
  }, [matches]);

  return (
    <div className="p-5 flex flex-col md:flex-row h-screen">
      <div className="sm:w-3/4">
        {" "}
        <div className="flex text-xl mb-4 items-center">
          <h1 className="">Join a Match! </h1>
          <p className="mx-2">OR</p>
          <Link to={"/dashboard/match/create"}>
            <button className="border-black border-2 m-1 p-1 rounded-lg bg-amber-500 hover:font-bold">
              Create a Match!
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
      <div className="sm:w-1/4">
        {" "}
        <PlayerCard />
      </div>
    </div>
  );
};

export default Dashboard;
