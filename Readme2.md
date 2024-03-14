# Evolve Mentor Mentee Management System
Welcome to the Evolve Mentor Mentee Management System. This project is designed to facilitate the interaction between mentors and mentees in a structured manner. It provides a platform for mentors and mentees to track their progress, set goals, and communicate effectively. The application also includes a admin panel to manage users, projects, track progress of individual mentees and mentors, and gather feedback from users.

The project is divided into two main parts: the `frontend` and the `backend`. The frontend is built using React and Vite, providing a user-friendly interface for both mentors and mentees. The backend is a Node.js server that handles data management and business logic.

The system also integrates with a PostgreSQL database to store and manage data. The database structure includes tables for users, projects, milestones, and more. The database is managed using Sequelize, a popular ORM for Node.js.

To get started with the project, follow the installation instructions provided in this README. If you encounter any issues or have any suggestions, feel free to contribute or open an issue.

Happy coding!

# Project Structure
The project is structured as follows:
- `frontend/`: Contains all frontend code and related configuration files.
- `backend/`: Contains all backend code and related configuration files.
    - `src/`: Contains the source code for the backend.
      - `config/`: Contains configuration files for the database setup.
      - `controllers/`: Contains the controllers for handling HTTP requests.
      - `models/`: Contains Sequelize models for each table in the database.
      - `routes/`: Contains the routes for the API.
      - `services/`: Contains the business logic for the application.
      - `validators/`: Contains validation logic for incoming requests.
`README.md`: Contains the project documentation and setup instructions.
