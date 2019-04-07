'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _interventions = require('../controllers/interventions');

var _interventions2 = _interopRequireDefault(_interventions);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/interventions', _auth2.default.verifyToken, _interventions2.default.getAllInterventions);

router.get('/interventions/:id', _auth2.default.verifyToken, _interventions2.default.getSingleIntervention);

router.post('/interventions', _validate2.default.isValid, _auth2.default.verifyToken, _interventions2.default.createIntervention);

router.patch('/interventions/:id/location', _auth2.default.verifyToken, _validate2.default.validateLocation, _interventions2.default.editLocation);

router.patch('/interventions/:id/comment', _auth2.default.verifyToken, _validate2.default.validateComment, _interventions2.default.editComment);

router.delete('/interventions/:id', _auth2.default.verifyToken, _interventions2.default.deleteIntervention);

exports.default = router;