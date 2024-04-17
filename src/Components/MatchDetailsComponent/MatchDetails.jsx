import React, { useEffect, useState } from "react";
import {
  useParams,
  useOutletContext,
  useNavigate,
  Link,
} from "react-router-dom";
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
    <div className="p-5 h-screen">
      <div className="grid grid-cols-2 pb-10">
        <div className="text-xl ">
          <p className="font-bold mb-1">Match Details: </p>
          <p className="mb-1">{dateFormatted(match.start_datetime)}</p>
          <p className="mb-1">{timeFormatted(match.start_datetime)}</p>
          <p className="mb-1">{match.duration} Minutes</p>
          <p className="mb-1">{`${address} `}</p>
          <p>{`${city}, ${state} ${zip}`}</p>
          <div>
            {user.id === match.creator_id && (
              <div className="mt-3">
                <Link to={`/dashboard/match/${id}/edit`}>
                  <button className="border-black border-2 mr-2 p-1 rounded-lg bg-amber-500 hover:font-bold">
                    Edit Match
                  </button>
                </Link>

                <button
                  className="border-black border-2 m-1 p-1 rounded-lg bg-amber-500 hover:font-bold"
                  onClick={handleDelete}
                >
                  Delete Match
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="h-80 w-90 overflow-hidden">
          <img
            src={match.img}
            className="object-cover h-full w-full border-black border-4"
            alt={`image of field`}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <TeamLineUp id={id} />
      </div>
    </div>
  );
};

export default MatchDetails;
