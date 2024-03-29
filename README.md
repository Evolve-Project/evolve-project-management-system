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


### Migrations
We have added corresponding migrations for each table. To run the migrations, use the following command:

**NOTE: Make sure to run these commands in the /backend directory.** // not in backend/src directory
```javascript
npx sequelize-cli db:migrate
```
This command will run all pending migrations(create all the tables in your database automatically). Migrations are considered pending if they have not been run yet.


Please note that migrations should be run in the order they were created to ensure the integrity of your database schema.
and for that we can migrate each file individually also using:
```javascript
npx sequelize-cli db:migrate npx sequelize-cli db:migrate --name migration_file_name.js
```
But do not worry, I have set all the files in correct order, so you can just run the first command and it will create all the tables in your database.

To undo the last migration, you can use the following command:
```bash
npx sequelize-cli db:migrate:undo
```
This command will undo the last migration that was run. If you want to undo all migrations, you can use the following command:
```bash
npx sequelize-cli db:migrate:undo:all
```
This command will undo all migrations that have been run.

### Seeders
Seeders are scripts that populate your database with initial data. They're often used in development environments to provide a set of data that helps test the application. Seeders can also be used in production to insert necessary data into the database, such as admin users or default settings.

In Sequelize, seeders are JavaScript files that export an object with two methods: up and down. The up method is used to insert data into the database, and the down method is used to undo the changes made by the up method.

**Running Seeders:**
To run your seeders, you can run the following command:
```bash
npx sequelize-cli db:seed:all
```

This command will run all the seeders in your seeders directory, in the order they are listed.

To undo the seeders, you can run the following command:
```bash
npx sequelize-cli db:seed:undo:all
```
This command will undo all your seeders, in the reverse order they are listed.


# quick way to setup database and add dummy data
#### Open the terminal and navigate to `/backend` directory and run the following commands in the order they are listed`(no need to go to /backend/src directory now as config file has been changed)`
```bash
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
This will create the database, run all the migrations and seeders and add dummy data to the database.


