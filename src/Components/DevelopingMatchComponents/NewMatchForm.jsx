import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const NewMatchForm = () => {
  const { user } = useOutletContext();
  const URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const [matchInput, setMatchInput] = useState({
    // start_datetime: null,
    date: "",
    time: "",
    duration: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    away_team_id: null,
    home_team_id: null,
    creator_id: user.id,
    player_slots: 12,
  });

  const [homeTeamInput, setHomeTeamInput] = useState({
    name: "",
    home_color: "",
    // away_color: "",
  });

  const [awayTeamInput, setAwayTeamInput] = useState({
    name: "",
    // home_color: "",
    away_color: "",
  });

  function handleChange(event) {
    setMatchInput({ ...matchInput, [event.target.id]: event.target.value });
  }
  function handleHomeTeamChange(event) {
    setHomeTeamInput({
      ...homeTeamInput,
      [event.target.id]: event.target.value,
    });
  }

  function handleAwayTeamChange(event) {
    setAwayTeamInput({
      ...awayTeamInput,
      [event.target.id]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const start_datetime = `${matchInput.date}T${matchInput.time}:00.000Z`;

    const match = {
      ...matchInput,
      start_datetime: start_datetime,
    };

    delete match.date;
    delete match.time;

    const homeTeam = homeTeamInput;
    const awayTeam = awayTeamInput;
    const createdMatch = { match, homeTeam, awayTeam };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createdMatch),
    };

    fetch(`${URL}/api/match`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="border-2 border-black p-5">
        <div className="flex justify-center font-bold text-2xl mb-4">
          <h1>Create a Game</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              value={matchInput.date}
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time">Time: </label>
            <input
              type="time"
              id="time"
              value={matchInput.time}
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration">Duration: </label>
            <select
              name="duration"
              id="duration"
              className="border border-gray-300 p-2 rounded-md"
              value={matchInput.duration}
              onChange={handleChange}
            >
              <option value="">-Select Match Length-</option>
              <option value="60">60 Minutes</option>
              <option value="90">90 Minutes</option>
              <option value="120">120 Minutes</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={matchInput.address}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Street Address"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={matchInput.city}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              value={matchInput.state}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md"
              maxLength={2}
              placeholder="e.g. XX"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zip">Zip:</label>
            <input
              type="text"
              id="zip"
              value={matchInput.zip}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md mb-2"
            />
          </div>
          {/* CREATING TEAMS */}
          <div className="border-2 border-black px-10 py-2">
            <div className="border-2 border-black p-5 m-5">
              <div className="flex flex-col ">
                <label htmlFor="homeTeam">Home Team Name:</label>
                <input
                  type="text"
                  id="name"
                  value={homeTeamInput.name}
                  onChange={handleHomeTeamChange}
                  className="border border-gray-300 p-2 rounded-md mb-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="homeTeamColor">Home Team Color:</label>
                <input
                  type="text"
                  id="home_color"
                  value={homeTeamInput.home_color}
                  onChange={handleHomeTeamChange}
                  className="border border-gray-300 p-2 rounded-md mb-2"
                />
              </div>
            </div>

            <div className="border-2 border-black p-5 m-5">
              <div className="flex flex-col">
                <label htmlFor="awayTeam">Away Team Name:</label>
                <input
                  type="text"
                  id="name"
                  value={awayTeamInput.name}
                  onChange={handleAwayTeamChange}
                  className="border border-gray-300 p-2 rounded-md mb-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="awayTeamColor">Away Team Color:</label>
                <input
                  type="text"
                  id="away_color"
                  value={awayTeamInput.away_color}
                  onChange={handleAwayTeamChange}
                  className="border border-gray-300 p-2 rounded-md mb-2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMatchForm;
