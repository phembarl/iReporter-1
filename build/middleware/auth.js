'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _connect = require('../models/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = {
  verifyToken: async function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        error: 'token is not provided'
      });
    }
    try {
      var decrypted = await _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var text = 'SELECT * FROM Users WHERE id = $1';

      var _ref = await _connect2.default.query(text, [decrypted.userId]),
          rows = _ref.rows;

      if (!rows[0]) {
        return res.status(400).json({
          message: 'Invalid token'
        });
      }
      req.user = { id: decrypted.userId };
      next();
    } catch (error) {
      return res.status(400).json({
        error: error
      });
    }
  }
};
exports.default = Auth;