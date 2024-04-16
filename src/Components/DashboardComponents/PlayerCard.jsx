import React from "react";
import { useOutletContext } from "react-router-dom";
import { dateFormatted } from "../../../helper";

const PlayerCard = () => {
  const { user } = useOutletContext();
  //   console.log(user.first_name);
  return (
    <div className="border-4 border-amber-500 max-h-fit m-7 my-16 bg-slate-100 rounded-xl">
      <div className="flex justify-center">
        <h1 className="font-bold p-5">{`${user.first_name} ${user.last_name}`}</h1>
      </div>
      <div className="flex justify-center items-center">
        <img
          src={user.img}
          className="h-60 w-60 rounded-2xl"
          alt="image of user"
        />
      </div>
      <div>
        <div className="flex justify-center p-2">
          <p>
            <strong>Preferred Position: </strong>
            {user.preferred_position}
          </p>
        </div>
        <div className="flex justify-center p-2">
          <p>
            <strong>Nationality: </strong>
            {user.nationality}
          </p>
        </div>
        <div className="flex justify-center p-2">
          <p>
            <strong>Date of Birth: </strong>
            {dateFormatted(user.date_of_birth)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
