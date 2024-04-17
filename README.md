# H2H App

[Frontend Auth Instructions](./instructions.md)

## Overview

Welcome to H2H! The app that spreads the love for the beautiful game. Whether you're looking to host a game or join an existing squad, our app connects you with fellow soccer lovers in your area. The 6 vs 6 format will provide you with the experience, the thrill of community and competition, easily organize or find a match, and ignite your passion for soccer like never before. Get ready to lace up, team up, and play up with our user-friendly platform that brings the game to your fingertips!

## Installation

- Fork and clone this repository

  - Open the repository in VS Code by running `code .` in the terminal
  - Run the command `npm install` to receive all the necessary dependecies

- Now clone this repository [Back End Server](https://github.com/CRDutan5/head2head-backend)

  - Run the command `npm install` to receive all the necessary dependecies

- Now with both terminals up for each respective repository run the command `npm run dev` for the backend you must first run the commands `npm run db:init` and `npm run db:seed` before doing so. This will make the page visible and make the server run in order to grab the preset information.

## Features

### Landing Page

- The landing page will prompt you to either login or register as a new user. After doing so you will be brought to the dashboard.

### View Matches

- There will be match cards that are displayed on the screen and each will have a View More... button. The match cards will display brief information regarding that match.

### Player Card

- There will also be a player card displayed on the dashboard that represent you the user! Bringing this app to life, making you feel like a true athlete!

### Match Details

- When you click on a specific match you will see more details regarding the match such as address, time schedule and an image of the field in case you haven't been there. There will also be the two teams that are playing that game.

### Team Lineups

- Depending on the match you will be displayed with two team tables. Each team has their own name which can be found above and will be the color they have to wear for the match. Within the table you will see the positions along with the name of the player if it's occupied. If not then you will be able to enroll into the selected position. You can also remove yourself from that team.

### Create Match

If you can't join a match because of time constraints. Not to worry! You can create your own match that is best for your needs. You will have to fill out the match information along with the team information.
All fields must be submitted! Once submitted, users will be able to see the match card.

### Edit Match

In case you need to change anything from your match posting. You will be able to by simply clicking on that specific match and hitting the edit button. From there you can edit the information and submit your changes.

### Delete Match

If you no longer want to have your match posted. You can just delete the match by going to the match card and viewing the details then hitting Delete. A popup will display asking you if you're sure.

### About the Dev

In the top right of the header we have provided a button when clicked will bring you to the "About the Dev" page. Here, you will get to know more about the creator of this application.

### Credits

- This project was possible by Carlitos Dutan
