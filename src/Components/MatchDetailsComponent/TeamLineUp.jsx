import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const TeamLineUp = ({ id }) => {
  // id is the match NOT TEAM
  const URL = import.meta.env.VITE_BASE_URL;
  const { user } = useOutletContext();
  const [teamDetails, setTeamDetails] = useState({});
  const [editTeam, setEditTeam] = useState({});

  useEffect(() => {
    fetch(`${URL}/api/match/${id}/teams`)
      .then((res) => res.json())
      .then((data) => setTeamDetails(data[0]));
  }, [id, teamDetails]);

  const awayTeamId = teamDetails.away_team_id;
  const homeTeamId = teamDetails.home_team_id;

  const positions = [
    "goalie",
    "defender_one",
    "defender_two",
    "midfielder_one",
    "midfielder_two",
    "forward",
  ];

  // const positionKey = `${teamType}_${position}_name`;
  // const updatedDetails = { ...teamDetails, [positionKey]: user.first_name };
  // console.log(updatedDetails);

  const handleJoinGame = (teamType, position) => {
    fetch(`${URL}/api/team/${teamType === "away" ? awayTeamId : homeTeamId}`)
      .then((res) => res.json())
      .then((teamData) => {
        const updatedTeamDetails = {
          ...teamData,
          [position]: user.id,
        };
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTeamDetails),
        };
        return fetch(
          `${URL}/api/team/${teamType === "away" ? awayTeamId : homeTeamId}`,
          options
        );
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error updating team lineup:", error));
  };

  return (
    <div className="flex justify-center">
      {["home", "away"].map((teamType) => (
        <div key={teamType} className="px-10">
          <h1>{teamDetails[`${teamType}_team_name`]}</h1>
          {positions.map((position) => {
            const positionKey = `${teamType}_${position}_name`;
            return (
              <p key={positionKey} className="border-2 border-black">
                <strong>{position.toUpperCase()}: </strong>
                {teamDetails[positionKey] ? (
                  teamDetails[positionKey]
                ) : (
                  <button onClick={() => handleJoinGame(teamType, position)}>
                    + Click here to join!
                  </button>
                )}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TeamLineUp;
