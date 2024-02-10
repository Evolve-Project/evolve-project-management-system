const {Pool} = require('pg');

const pool =  new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TasksMilestones',
    password: 'Mylove123',
    port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Database connected...');
    // Execute queries here
  })
  .catch(err => {
    console.error('Error connecting:', err);
  });

module.exports = {
    query: (text, params) => pool.query(text,params),
}