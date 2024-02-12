# Evolve Mentor Mentee Management Project

Install instructions:
```
git clone https://github.com/Evolve-Project/evolve-project-management-system
cd evolve-project-management-system
```
## For Frontend 
```
cd frontend 
npm install 
npm run dev
```
## For Backend

create a copy of .env.example file and remove the .example extension
PORT = 8000
SECRET = evolvesecretfile

CLIENT_URL = http://localhost:3000
SERVER_URL = http://localhost:8000 
```
cd backend
npm install
npm run dev
```

## For Database
So guys here is the basic details about our database so far

### Folder Structure
> **The main folders you need to be aware of are:**

**config:** This folder contains configuration for your database setup. It includes details like the database name, username, password, host, and dialect. So install and setup postgres on your machine and I don't think you will need to make changes to this file, I have kept everything default but if you still encounter any problems feel free to ping me

**models:** This folder contains files for each model in your application. Each file defines a database table and its fields. That means each file you see in models folder is a table in our database, you can check it out and see if everything adds up.


**migrations:** This folder contains migration files. Each file defines a change to the database schema, like creating a table or adding a column.
>-- don't worry too much about migrations folder for now

### Database Tables
So far, we have created the following tables:

**users:** This table stores user data. Each user can be a mentee or a mentor.

**mentees: **This table stores mentee data. Each mentee is associated with one user and one project.

**projects:** This table stores project data. Each project can have multiple mentees.

### Migrations
We have added corresponding migrations for each table. To run the migrations, use the following command:
```javascript
npx sequelize-cli db:migrate
```
This command will run all pending migrations(create all the tables in your database automatically). Migrations are considered pending if they have not been run yet.

Please note that migrations should be run in the order they were created to ensure the integrity of your database schema.
and for that we can migrate each file individually also using:
```javascript
npx sequelize-cli db:migrate npx sequelize-cli db:migrate --name migration_file_name.js
```


### Seeders
Seeders are scripts that populate your database with initial data. They're often used in development environments to provide a set of data that helps test the application. Seeders can also be used in production to insert necessary data into the database, such as admin users or default settings.

In Sequelize, seeders are JavaScript files that export an object with two methods: up and down. The up method is used to insert data into the database, and the down method is used to undo the changes made by the up method.

#### Running Seeders
To run your seeders, you can use the Sequelize CLI's db:seed:all command:

This command will run all the seeders in your seeders directory, in the order they are listed.

To undo the seeders, you can use the db:seed:undo:all command:

This command will undo all your seeders, in the reverse order they are listed.


# quick way to setup database
enter these commands one by one in terminal

```js
npx sequelize-cli db:drop // run this only if you have previously created database to delete and recreate it
npx sequelize-cli db:create
npx sequelize-cli db:migrate
// instead of this run the below seeds -- npx sequelize-cli db:seed:all
npx sequelize db:seed --seed 20240210190115-demo-user.js
npx sequelize db:seed --seed 20240212080357-demo_projects.js
npx sequelize db:seed --seed 20240212111734-demo_mentee.js
npx sequelize db:seed --seed 20240212111741-demo_mentor.js
npx sequelize db:seed --seed 20240212081246-demo_sdlc.js
npx sequelize db:seed --seed 20240212082746-demo_milestones.js
npx sequelize db:seed --seed 20240212072539-demo_tasks.js
```