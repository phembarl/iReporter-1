import db from '../models/connect';

db.query(`CREATE TABLE IF NOT EXISTS Users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) not null,
  lastname VARCHAR(255) not null,
  othernames VARCHAR(255) not null,
  email VARCHAR(255) UNIQUE not null,
  password VARCHAR(255) UNIQUE not null,
  phoneNumber VARCHAR(255) not null,
  username VARCHAR(255) not null,
  registered TIMESTAMP DEFAULT NOW(),
  isAdmin BOOLEAN DEFAULT false);`,
(err) => {
  if (err) {
    return console.log('error running query', err);
  }
  console.log('Your query was successful');
});

db.query(`CREATE TABLE IF NOT EXISTS RedFlags(
  id SERIAL PRIMARY KEY,
  createdOn TIMESTAMP DEFAULT NOW(),
  createdBy INT,
  type VARCHAR(255),
  location VARCHAR(255) not null,
  status VARCHAR(255) not null,
  Images VARCHAR(255),
  comment VARCHAR(255) not null);`,
(err) => {
  if (err) {
    return console.log('error running query', err);
  }
  console.log('Your query was successful');
});

db.query(`CREATE TABLE IF NOT EXISTS Interventions(
  id SERIAL PRIMARY KEY,
  createdOn TIMESTAMP DEFAULT NOW(),
  createdBy INT,
  type VARCHAR(255),
  location VARCHAR(255) not null,
  status VARCHAR(255) not null,
  Images VARCHAR(255),
  comment VARCHAR(255) not null);`,
(err) => {
  if (err) {
    return console.log('error running query', err);
  }
  console.log('Your query was successful');
});
