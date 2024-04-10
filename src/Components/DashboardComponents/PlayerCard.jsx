import React from "react";
import { useOutletContext } from "react-router-dom";

const PlayerCard = () => {
  const { user } = useOutletContext();
  //   console.log(user.first_name);
  return (
    <div className="border-2 border-black max-h-fit">
      <div className="flex justify-center">
        <h1 className="font-bold">{`${user.first_name} ${user.last_name}`}</h1>
      </div>
    </div>
  );
};

export default PlayerCard;
