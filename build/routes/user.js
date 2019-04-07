'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import midware from '../middleware/validate';

var router = _express2.default.Router();

router.post('/auth/signup', _user2.default.createUser);

router.post('/auth/login', _user2.default.login);

exports.default = router;