const express = require('express');
const bodyParser = require('body-parser')
const {db} = require('../sequelize.config');

const db_port = process.env.DB_PORT || 3001;
const server = express();



server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

db.sync({ force: false}).then(() => {
  server.listen(db_port, () => {
    console.log(`${server.name} listening at PORT:${db_port}`);
  });
});


async function testConnection() {
  try {
    await db.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();