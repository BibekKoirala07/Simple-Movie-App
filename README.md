Simple Movie App
A simple movie browsing app where users can explore movie details, including title, description, release year, and ratings. This app is built using the MERN stack (MongoDB, Express.js, React, Node.js) and allows users to search for movies through an API integration.

Features
Search Movies: Search for movies by title.
Movie Details: View movie information such as title, release year, description, and ratings.
Responsive UI: Mobile-friendly design for smooth usage across all devices.
Simple Navigation: Easy navigation to explore movies.
Technologies Used
Frontend:

React.js
React Router
Axios for API requests
CSS for styling
Backend:

Node.js
Express.js
OMDB API (for fetching movie data)
Database: MongoDB (Optional for storing user data or history)

Installation
1. Clone the repository
bash
Copy code
git clone https://github.com/BibekKoirala07/Simple-Movie-App.git
cd Simple-Movie-App
2. Backend Setup
Go to the backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Set up your .env file with the following key:

makefile
Copy code
OMDB_API_KEY=your_omdb_api_key
Start the backend server:

bash
Copy code
npm start
3. Frontend Setup
Go to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend server:

bash
Copy code
npm start
Usage
Once the app is running, open the browser and navigate to http://localhost:3000 to view the movie app.

You can search for movies by entering the title in the search bar.
Click on any movie from the search results to see more details.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
OMDB API for movie data
React, Node.js, and other libraries used in the project
