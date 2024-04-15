import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { dateFormatted, timeFormatted } from "../../../helper";
import TeamLineUp from "./TeamLineUp";

const MatchDetails = () => {
  const URL = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();
  const { user } = useOutletContext();

  const navigate = useNavigate();

  const [match, setMatch] = useState({});

  useEffect(() => {
    fetch(`${URL}/api/match/${id}`)
      .then((res) => res.json())
      .then((data) => setMatch(data));
  }, []);

  const { address, state, city, zip } = match;

  function handleDelete() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );
    if (isConfirmed) {
      const options = {
        method: "DELETE",
      };
      fetch(`${URL}/api/match/${id}`, options).then(() => {
        console.log("Match Deleted!");
        navigate("/dashboard");
      });
    }
  }

  return (
    <div className="p-5">
      <div>
        {user.id === match.creator_id && (
          <div>
            <button className="border-black border-2 p-1 my-2 mr-2 rounded-lg bg-slate-100 hover:bg-gradient-to-b from-green-500 to-lime-400 font-bold">
              Edit Match
            </button>
            <button
              className="border-black border-2 p-1 rounded-lg bg-slate-100 hover:bg-gradient-to-b from-green-500 to-lime-400 font-bold"
              onClick={handleDelete}
            >
              Delete Match
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="text-xl ">
          <p className="font-bold mb-1">Match Details: </p>
          <p className="mb-1">{dateFormatted(match.start_datetime)}</p>
          <p className="mb-1">{timeFormatted(match.start_datetime)}</p>
          <p className="mb-1">{match.duration} Minutes</p>
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
        <TeamLineUp id={id} />
      </div>
    </div>
  );
};

export default MatchDetails;
