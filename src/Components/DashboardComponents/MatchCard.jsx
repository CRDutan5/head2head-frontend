import React from "react";
import { dateFormatted, timeFormatted } from "../../../helper";
import { Link } from "react-router-dom";

const MatchCard = ({ match }) => {
  return (
    <div className="max-w-sm  flex shadow-2xl rounded-lg border-4 border-gray-200 bg-slate-100">
      <div className=" flex-1">
        <div className="h-52 w-80 overflow-hidden">
          <img
            src={match.img}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <div>
            <p className="m-1">{dateFormatted(match.start_datetime)}</p>
            <p className="m-1">{timeFormatted(match.start_datetime)}</p>
          </div>
          <div>
            <p className="m-1">
              {match.city}, {match.state}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to={`/dashboard/match/${match.id}`}>
            <button className="border-black border-2 m-1 p-1 rounded-lg bg-amber-500 hover:font-bold">
              View More...
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
