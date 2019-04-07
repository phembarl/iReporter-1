'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();
// import db from '../models/connect';

// const user = (req, res) => {
//   const { firstname, lastname, othernames,
//     email, phoneNumber, username, registered,
//     isAdmin,
//   } = req.body;

//   data.connect((err) => {
//     if (err) {
//       return res.json({
//         status: 500,
//         error: 'Could not conect to server',
//       });
//     }
//   });
// };

var ValidateUser = function () {
  function ValidateUser() {
    _classCallCheck(this, ValidateUser);
  }

  _createClass(ValidateUser, null, [{
    key: 'hashPassword',
    value: function hashPassword(password) {
      return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8));
    }
  }, {
    key: 'comparePassword',
    value: function comparePassword(hashPassword, password) {
      return _bcrypt2.default.compareSync(password, hashPassword);
    }
  }, {
    key: 'isValidEmail',
    value: function isValidEmail(email) {
      return (/\S+@\S+/.test(email)
      );
    }
  }, {
    key: 'generateToken',
    value: function generateToken(id) {
      var token = _jsonwebtoken2.default.sign({ userId: id }, process.env.SECRET, { expiresIn: '7d' });
      return token;
    }
  }]);

  return ValidateUser;
}();

exports.default = ValidateUser;