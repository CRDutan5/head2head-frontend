import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dateFormatted, timeFormatted } from "../../../helper";

const MatchDetails = () => {
  const URL = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();

  const [match, setMatch] = useState({});

  useEffect(() => {
    fetch(`${URL}/api/match/${id}`)
      .then((res) => res.json())
      .then((data) => setMatch(data));
  }, []);

  const { address, state, city, zip } = match;

  return (
    <div className="p-5">
      <div className="grid grid-cols-2 pb-10">
        <div className="text-xl">
          <p className="mb-1">{dateFormatted(match.start_datetime)}</p>
          <p className="mb-1">{timeFormatted(match.start_datetime)}</p>
          <p className="mb-1">{match.duration} minutes</p>
          <p className="mb-1">{`${address} `}</p>
          <p>{`${city}, ${state} ${zip}`}</p>
        </div>
        <div className="h-80 w-90 overflow-hidden">
          <img
            src={match.img}
            className="border-black border-4"
            alt={`image of field}`}
          />
        </div>
      </div>
      <div>
        <h1>This is where Teams will go</h1>
      </div>
    </div>
  );
};

export default MatchDetails;
