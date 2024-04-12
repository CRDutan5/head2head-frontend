import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const TeamLineUp = ({ id }) => {
  const URL = import.meta.env.VITE_BASE_URL;
  const { user } = useOutletContext();
  const [teamDetails, setTeamDetails] = useState({});
  const [isPositionSelected, setIsPositionSelected] = useState(false);
  const [individualTeamDetails, setIndividualTeamDetails] = useState({});

  useEffect(() => {
    fetch(`${URL}/api/match/${id}/teams`)
      .then((res) => res.json())
      .then((data) => setTeamDetails(data[0]));

    fetch(`${URL}/api/team/${user.id}`)
      .then((res) => res.json())
      .then((teamData) => setIndividualTeamDetails(teamData))
      .catch((error) =>
        console.error("Error fetching individual team details:", error)
      );
  }, [id, user.id, teamDetails]);

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

  const handleRemove = (positionKey) => {};

  const handleJoinGame = (teamType, position) => {
    setIsPositionSelected(true);
    fetch(`${URL}/api/team/${teamType === "away" ? awayTeamId : homeTeamId}`)
      .then((res) => res.json())
      .then((teamData) => {
        const updatedTeamDetails = {
          ...teamData,
          [position]: user.id,
        };
        setIndividualTeamDetails(updatedTeamDetails);
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
      .catch((error) => console.error("Error updating team lineup:", error));
  };

  // IndividualTeamDetails State:
  // {
  //   "id": 1,
  //   "name": "Phoenix Rising",
  //   "home_color": "Red",
  //   "away_color": "Blue",
  //   "creator_id": 1,
  //   "goalie": 4,
  //   "defender_one": 3,
  //   "defender_two": 7,
  //   "midfielder_one": 6,
  //   "midfielder_two": 10,
  //   "forward": 9
  //   }

  // TeamDetails State:
  // {
  //   "match_id": 6,
  //   "home_team_id": 12,
  //   "away_team_id": 11,
  //   "home_team_name": "Twilight Titans",
  //   "away_team_name": "Olympian Owls",
  //   "home_goalie_name": "John",
  //   "home_defender_one_name": "John",
  //   "home_defender_two_name": null,
  //   "home_midfielder_one_name": null,
  //   "home_midfielder_two_name": null,
  //   "home_forward_name": null,
  //   "away_goalie_name": "James",
  //   "away_defender_one_name": "David",
  //   "away_defender_two_name": null,
  //   "away_midfielder_one_name": "William",
  //   "away_midfielder_two_name": "Ryan",
  //   "away_forward_name": "Alexander"
  //   }

  return (
    <div className="flex justify-center">
      {["home", "away"].map((teamType) => (
        <div key={teamType} className="px-10">
          <div className="flex justify-center font-bold text-xl">
            <h1>{teamDetails[`${teamType}_team_name`]}</h1>
          </div>
          {positions.map((position) => {
            const positionKey = `${teamType}_${position}_name`;
            return (
              <p
                key={positionKey}
                className="border-2 border-black py-2 px-10 flex justify-center rounded-md m-2"
              >
                <strong>{position.toUpperCase()}: </strong>
                {teamDetails[positionKey] ? (
                  <>
                    <span>{teamDetails[positionKey]}</span>
                    {user.id === individualTeamDetails.id &&
                      user.first_name === teamDetails[positionKey] && (
                        <button
                          onClick={() => handleRemove(positionKey)}
                          className="border-2 border-black"
                        >
                          ❌ Remove
                        </button>
                      )}
                  </>
                ) : (
                  <button
                    onClick={() => handleJoinGame(teamType, position)}
                    disabled={isPositionSelected}
                  >
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
