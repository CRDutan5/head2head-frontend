import React from "react";
import { dateFormatted, timeFormatted } from "../../../helper";

const MatchCard = ({ match }) => {
  return (
    <div className="max-w-sm border-4 border-black flex">
      <div className="flex-1">
        <div className="h-52 w-80 overflow-hidden">
          <img src={match.img} alt="" className="w-full h-full object-cover" />
        </div>
        <p className="m-1">{dateFormatted(match.start_datetime)}</p>
        <p className="m-1">{timeFormatted(match.start_datetime)}</p>
        <div className="flex justify-end">
          <button className="border-black border-2 m-1 p-1 rounded-lg">
            View More...
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
