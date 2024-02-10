// const {Pool} = require('pg');

// const pool =  new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'evolve',
//     password: 'postgres',
//     port: 5432,
// });

// module.exports = {
//     query: (text, params) => pool.query(text,params),
// }

const { Sequelize } = require('sequelize');

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize('evolve-application', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
