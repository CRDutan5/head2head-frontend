import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MatchCard from "./DashboardComponents/MatchCard";

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
    <div className="p-5">
      <h1 className="text-xl">Join a Game!</h1>
      <div className="flex flex-wrap gap-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
