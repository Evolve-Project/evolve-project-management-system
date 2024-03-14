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

# Installation
To install and run the project, follow these steps:

1. Clone the repository:
git clone https://github.com/Evolve-Project/evolve-project-management-system
cd evolve-project-management-system

2. Install and run the frontend:
```bash
cd frontend 
npm install 
npm run dev
```

3. Install and run the backend:
```bash
cd backend
npm install
npm run dev
```

3. Create a PostgreSQL database and update the database configuration in the `backend/.env` file. Speaking of which, you will need to create a `.env` file in the `backend` directory and add the following environment variables:
```bash
PORT = <PORT_NUMBER>
SECRET = '<SECRET_KEY>'

CLIENT_URL =  '<CLIENT_URL>'
SERVER_URL =  '<SERVER_URL>'

DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
DB_NAME=<DB_NAME>
DB_HOST=<DB_HOST>
DB_DIALECT=<DB_DIALECT>
DB_PORT=<DB_PORT>
```

4. Run the database migrations:
```bash
npx sequelize-cli db:migrate
```


# Usage
Once the installation is complete, you can access the application by visiting the frontend URL in your browser. The application provides a user-friendly interface for both mentors and mentees to track their progress, set goals, and communicate effectively. The admin panel allows you to manage users, projects, track progress of individual mentees and mentors, and gather feedback from users. Here are some of the main features of the application:
1. User Authentication: The application provides features for users to sign up, log in, and reset their passwords. User information is securely stored in the database. For enhanced security, the application utilizes JWT tokens for authentication. Additionally, all passwords are hashed using `bcrypt` to ensure data integrity and confidentiality.
2. Mentor-Mentee Interaction: Mentors and mentees can communicate(through Queries section) for any queries or doubts.
3. Admin Panel: Admins can manage users, projects, track progress of individual mentees and mentors, and gather feedback from users.
4. User Creation: Admins can create new users and assign them roles (mentor or mentee) as needed. Admin also has the ability to add bulk users using a CSV or Excel file. The admin is able to assign mentors to mentees and vice versa with a single click.
5. Project Management: The mentors have the freedom to create projects and assign them to mentees. They can also track the progress of the projects and provide feedback to the mentees. The mentees can view the projects assigned to them and track their progress. All this information is stored in the database and can be accessed through the admin panel.
6. Feedback: The application provides a feedback mechanism for users to provide feedback on their mentors, mentees, and projects. This feedback is stored in the database and can be accessed through the admin panel. The feedback is used to improve the mentor-mentee relationship and the overall user experience. The admin panel also includes a wordcloud of the feedback provided by the users. This wordcloud is generated using the `d3-cloud` library and provides a visual representation of the most common words used in the feedback. This helps the admin to quickly identify the most common themes and issues raised by the users.
7. Attendance: The application provides a feature for mentors to mark the attendance of the mentees. This information is stored in the database and can be accessed through the admin panel. The admin panel also includes a visual representation of the attendance data in the form of a bar chart. This helps the admin to quickly identify the attendance patterns of the mentees and mentors.
8. Milestones: The application provides a feature for mentors to set milestones for the mentees. This information is stored in the database and can be accessed through the admin panel. The admin panel also includes a visual representation of the milestone data in the form of a line chart. This helps the admin to quickly identify the progress of the mentees and mentors towards their goals.
9. User Profile: The application provides a feature for users to view and update their profiles. Users can update their personal information, change their passwords.

## Here's a demo of the application:
[video of the application](video link)

# Components and APIs:
## Frontend:
The frontend is built using React and Vite. It provides a user-friendly interface for both mentors and mentees. 
### Third-party Libraries:
- `axios`: Used for making HTTP requests to the backend API.

### Components:
- `App`: The main component that renders the entire application. It includes the routing logic and renders the appropriate components based on the URL.
- `Header`: The header component that is displayed at the top of the application. It includes the navigation links and user authentication logic.
- `Footer`: The footer component that is displayed at the bottom of the application. It includes the copyright information.
- `Home`: The home page component that is displayed when the user is not logged in. It includes a brief description of the application and a call-to-action to sign up or log in.
- `Dashboard`: The dashboard component that is displayed when the user is logged in. It includes the main content of the application, such as the user profile, projects, feedback, and attendance.

## Backend:
The backend is a Node.js server that handles data management and business logic. It integrates with a PostgreSQL database to store and manage data. The database structure includes tables for users, projects, milestones, and more. The database is managed using Sequelize, a popular ORM for Node.js.
### Third-party Libraries:
- `express`: Used for creating the server and handling HTTP requests.
- `sequelize`: Used for managing the database and defining models.
- `jsonwebtoken`: Used for generating and verifying JWT tokens for user authentication.
- `bcrypt`: Used for hashing passwords for enhanced security.

### APIs:
- `POST /api/auth/signup`: Used for user registration. It accepts the user's email, password, and role, and creates a new user in the database.

## Database:
The database is a PostgreSQL database that stores and manages data for the application. It includes tables for users, projects, milestones, and more. The database is managed using Sequelize, a popular ORM for Node.js.

### Tables:
- `users`: Contains information about the users of the application, such as their email, password, and role.

### Relationships:

### Migrations:

### Seeders:

### Configurations:

### Entity Relationship Diagram:




***Thank you for reading the README. We hope you enjoy using the Evolve Mentor Mentee Management System! If you encounter any issues or have any suggestions, feel free to contribute or open an issue. Happy coding!***