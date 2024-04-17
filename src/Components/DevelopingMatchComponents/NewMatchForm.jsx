import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import {
  dateFormatted,
  dateFormattedForm,
  formatDateAndTime,
  formatTime,
  timeFormatted,
} from "../../../helper";

const NewMatchForm = () => {
  const { user } = useOutletContext();
  const URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`${URL}/api/match/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMatchInput((prevMatchInput) => ({
            ...prevMatchInput,
            date: dateFormattedForm(data.start_datetime),
            time: formatTime(data.start_datetime),
            ...data, // Keep other properties intact
          }));
          fetch(`${URL}/api/match/${id}/teams`)
            .then((res) => res.json())
            .then((teamData) => {
              setHomeTeamInput({
                name: teamData[0].home_team_name || "",
                home_color: teamData[0].home_team_color || "",
              });
              setAwayTeamInput({
                name: teamData[0].away_team_name || "",
                away_color: teamData[0].away_team_color || "",
              });
            });
        });
    }
  }, [id]);

  const [matchInput, setMatchInput] = useState({
    date: "",
    time: "",
    duration: "",
    img: "",
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
  });

  const [awayTeamInput, setAwayTeamInput] = useState({
    name: "",
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

  // CHECK THE TIME, IT HAS TO BE FORMATTED CORRECTLY, IF I PUT 5 IT GOES TO 9. INCREMENTS BY 4
  function handleSubmit(event) {
    event.preventDefault();

    if (id) {
      const match = {
        ...matchInput,
        start_datetime: `${matchInput.date}T${matchInput.time}:00.000Z`,
      };
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(match),
      };
      fetch(`${URL}/api/match/${id}`, options)
        .then((res) => res.json())
        .then((data) => console.log("Successfully Updated!", data))
        .then((data) => navigate(`/dashboard/match/${match.id}`));
    } else {
      const match = {
        ...matchInput,
        start_datetime: `${matchInput.date}T${matchInput.time}:00.000Z`,
      };

      delete match.date;
      delete match.time;

      console.log(match);
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
          navigate(`/dashboard/match/${data.id}`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div className="flex justify-center items-center mt-16 h-screen ">
      <div className="border-4 border-black p-5 rounded-xl shadow-2xl">
        <div className="flex justify-center font-bold text-2xl mb-4">
          <h1>{id ? "Edit Game" : "Create a Game!"}</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
          <div className="flex flex-col w-full md:w-1/2 md:pr-4">
            <div className="flex flex-col">
              <label htmlFor="date">Date: </label>
              <input
                type="date"
                id="date"
                value={matchInput.date}
                className="border border-gray-300 p-2 rounded-md"
                onChange={handleChange}
                // required
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
                // required
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
                // required
              >
                <option value="">-Select Match Length-</option>
                <option value="60">60 Minutes</option>
                <option value="90">90 Minutes</option>
                <option value="120">120 Minutes</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="time">Image Link: </label>
              <input
                type="url"
                id="img"
                value={matchInput.img}
                className="border border-gray-300 p-2 rounded-md"
                onChange={handleChange}
                placeholder="https://example.com"
                // required
              />
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
                // required
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
                // required
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
                // required
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
                // required
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 md:pl-4 items-center justify-center">
            <div className="border-2 border-black rounded-xl bg-amber-500 p-5 m-5">
              <div className="flex flex-col ">
                <label htmlFor="homeTeam">Home Team Name:</label>
                <input
                  type="text"
                  id="name"
                  value={homeTeamInput.name}
                  onChange={handleHomeTeamChange}
                  className="border border-gray-300 p-2 rounded-md mb-2"
                  // required
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
                  // required
                />
              </div>
            </div>
            <div className="border-2 border-black bg-amber-500 rounded-xl p-5 m-5">
              <div className="flex flex-col">
                <label htmlFor="awayTeam">Away Team Name:</label>
                <input
                  type="text"
                  id="name"
                  value={awayTeamInput.name}
                  onChange={handleAwayTeamChange}
                  className="border border-gray-300 p-2 rounded-md mb-2"
                  // required
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
                  // required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="border-black border-2 m-1 px-4 py-2 rounded-lg bg-amber-500 hover:font-bold"
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
