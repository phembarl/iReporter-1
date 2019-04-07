'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = require('../models/connect');

var _connect2 = _interopRequireDefault(_connect);

var _validateUser = require('./validateUser');

var _validateUser2 = _interopRequireDefault(_validateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import moment from 'moment';
var User = {
  createUser: async function createUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'input email address and password'
      });
    }
    if (!_validateUser2.default.isValidEmail(req.body.email)) {
      res.status(400).json({
        message: 'Input a valid email address'
      });
    }
    var hashPassword = _validateUser2.default.hashPassword(req.body.password);

    var newUser = 'INSERT INTO Users(firstname, lastname, othernames, email,\n    password, phoneNumber, username)\n    VALUES($1, $2, $3, $4, $5, $6, $7)\n    returning *';

    var values = [req.body.firstname, req.body.lastname, req.body.othernames, req.body.email, hashPassword, req.body.phoneNumber, req.body.username];

    try {
      var _ref = await _connect2.default.query(newUser, values),
          rows = _ref.rows;

      var userToken = _validateUser2.default.generateToken(rows[0].id);
      return res.status(201).json({ token: userToken });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          error: 'User with that email already exists'
        });
      }
      return res.status(400).json({
        error: error
      });
    }
  },
  login: async function login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'input email address and password'
      });
    }
    if (!_validateUser2.default.isValidEmail(req.body.email)) {
      res.status(400).json({
        message: 'Input a valid email address'
      });
    }
    var text = 'SELECT * FROM Users WHERE email = $1';

    try {
      var _ref2 = await _connect2.default.query(text, [req.body.email]),
          rows = _ref2.rows;

      if (!rows[0]) {
        return res.status(400).json({
          message: 'account does not exist'
        });
      }
      if (!_validateUser2.default.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          error: 'incorrect email or password'
        });
      }
      var token = _validateUser2.default.generateToken(rows[0].id);
      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(200).json({ error: error });
    }
  }
};

exports.default = User;