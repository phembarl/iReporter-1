'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _redFlags = require('./routes/red-flags');

var _redFlags2 = _interopRequireDefault(_redFlags);

var _interventions = require('./routes/interventions');

var _interventions2 = _interopRequireDefault(_interventions);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/api/v1/', _redFlags2.default);
app.use('/api/v1/', _interventions2.default);
app.use('/api/v1/', _user2.default);

app.listen(port, function () {
  console.log('Your app is being served on port', port);
});

exports.default = app;