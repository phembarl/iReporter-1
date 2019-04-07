'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redFlags = require('../controllers/redFlags');

var _redFlags2 = _interopRequireDefault(_redFlags);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/red-flags', _auth2.default.verifyToken, _redFlags2.default.getAllRedFlags);

router.get('/red-flags/:id', _auth2.default.verifyToken, _redFlags2.default.getSingleRedFlag);

router.post('/red-flags', _auth2.default.verifyToken, _validate2.default.isValid, _redFlags2.default.createRedFlag);

router.patch('/red-flags/:id/location', _auth2.default.verifyToken, _validate2.default.validateLocation, _redFlags2.default.editLocation);

router.patch('/red-flags/:id/comment', _auth2.default.verifyToken, _validate2.default.validateComment, _redFlags2.default.editComment);

router.delete('/red-flags/:id', _auth2.default.verifyToken, _redFlags2.default.deleteRedFlag);

exports.default = router;