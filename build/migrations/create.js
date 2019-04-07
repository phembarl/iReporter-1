'use strict';

var _connect = require('../models/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_connect2.default.query('CREATE TABLE IF NOT EXISTS Users(\n  id SERIAL PRIMARY KEY,\n  firstname VARCHAR(255) not null,\n  lastname VARCHAR(255) not null,\n  othernames VARCHAR(255) not null,\n  email VARCHAR(255) UNIQUE not null,\n  password VARCHAR(255) UNIQUE not null,\n  phoneNumber VARCHAR(255) not null,\n  username VARCHAR(255) not null,\n  registered TIMESTAMP DEFAULT NOW(),\n  isAdmin BOOLEAN DEFAULT false);', function (err) {
  if (err) {
    return console.log('error running query', err);
  }
  console.log('Your query was successful');
});

_connect2.default.query('CREATE TABLE IF NOT EXISTS RedFlags(\n  id SERIAL PRIMARY KEY,\n  createdOn TIMESTAMP DEFAULT NOW(),\n  createdBy INT,\n  type VARCHAR(255),\n  location VARCHAR(255) not null,\n  status VARCHAR(255) not null,\n  Images VARCHAR(255),\n  comment VARCHAR(255) not null);', function (err) {
  if (err) {
    return console.log('error running query', err);
  }
  console.log('Your query was successful');
});

_connect2.default.query('CREATE TABLE IF NOT EXISTS Interventions(\n  id SERIAL PRIMARY KEY,\n  createdOn TIMESTAMP DEFAULT NOW(),\n  createdBy INT,\n  type VARCHAR(255),\n  location VARCHAR(255) not null,\n  status VARCHAR(255) not null,\n  Images VARCHAR(255),\n  comment VARCHAR(255) not null);', function (err) {
  if (err) {
    return console.log('error running query', err);
  }
  console.log('Your query was successful');
});