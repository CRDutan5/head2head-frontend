import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MatchDetails = () => {
  const URL = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();

  const [match, setMatch] = useState({});

  useEffect(() => {
    fetch(`${URL}/api/match/${id}`)
      .then((res) => res.json())
      .then((data) => setMatch(data));
  }, []);

  return (
    <div className="p-5">
      <h1>{match.city}</h1>
    </div>
  );
};

export default MatchDetails;
