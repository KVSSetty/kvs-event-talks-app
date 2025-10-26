# Tech Talk Webapp

A single-page website for a technical talk event.

## Features

*   Displays a schedule of technical talks.
*   Allows searching for talks by category.
*   Automatically inserts breaks in the schedule.

## Installation

1.  Clone the repository.
2.  Run `npm install` to install the dependencies.

## Usage

1.  Run `npm start` to start the server.
2.  Open `http://localhost:3000` in your browser.

## Project Structure

*   `server.js`: The main server file (using Express.js).
*   `talks.json`: The data for the talks.
*   `public/`: The directory for static files (HTML, CSS, JavaScript).
    *   `index.html`: The main HTML file.
    *   `script.js`: The client-side JavaScript for fetching data and rendering the schedule.
    *   `style.css`: The CSS for styling the application.
