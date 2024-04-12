import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const NewMatchForm = () => {
  const { user } = useOutletContext();

  const [userInput, setUserInput] = useState({
    date: null,
    time: null,
    duration: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    away_team_id: null,
    home_team_id: null,
    creator_id: user.id,
    player_slots: 12,
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 border-black">
        <h1>Create a Game</h1>
        {/* <p>{userInput}</p> */}
      </div>
    </div>
  );
};

export default NewMatchForm;
