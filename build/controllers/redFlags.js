'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = require('../models/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedFlags = {
  getAllRedFlags: function getAllRedFlags(req, res) {
    _connect2.default.query('SELECT * FROM redflags', function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      if (result.rows.length === 0) {
        res.json({
          message: 'It is empty over here'
        });
      }
      return res.json({
        data: result.rows
      });
    });
  },
  getSingleRedFlag: function getSingleRedFlag(req, res) {
    var id = Number(req.params.id);

    _connect2.default.query('SELECT * FROM redflags WHERE id = ' + id, function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'red-flag record not found'
        });
      }
      return res.json({
        status: 200,
        data: result.rows
      });
    });
  },
  createRedFlag: async function createRedFlag(req, res) {
    var text = 'INSERT INTO redflags(createdOn, createdBy,type, location, status,images, videos, comment)\n    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';

    var values = [req.body.createdOn, req.body.createdBy, req.body.type, req.body.location, req.body.status, req.body.images, req.body.videos, req.body.comment];

    try {
      var _ref = await _connect2.default.query(text, values),
          rows = _ref.rows;

      return res.status(201).send({
        data: [{
          id: rows[0].id,
          redFlag: rows[0],
          message: 'Created red-flag record'
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error
      });
    }
  },
  editLocation: async function editLocation(req, res) {
    var id = Number(req.params.id);
    try {
      var _ref2 = await _connect2.default.query('UPDATE redflags \n    SET location = $1 WHERE id = $2 returning *', [req.body.location, id]),
          rows = _ref2.rows;

      return res.status(200).send({
        data: [{
          id: id,
          redFlag: rows[0],
          message: 'Updated red-flag record\'s location'
        }]
      });
    } catch (error) {
      return res.status(400).json({
        error: error
      });
    }
  },
  editComment: async function editComment(req, res) {
    var id = Number(req.params.id);
    try {
      var _ref3 = await _connect2.default.query('UPDATE redflags \n    SET comment = $1 WHERE id = $2 returning *', [req.body.comment, id]),
          rows = _ref3.rows;

      return res.status(200).send({
        data: [{
          id: id,
          redFlag: rows[0],
          message: 'Updated red-flag record\'s comment'
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error
      });
    }
  },
  deleteRedFlag: async function deleteRedFlag(req, res) {
    var id = Number(req.params.id);
    try {
      var _ref4 = await _connect2.default.query('DELETE FROM redflags \n    WHERE id = $1', [id]),
          rows = _ref4.rows;

      return res.json({
        data: [{
          id: id,
          redFlag: rows[0],
          message: 'red-flag record has been deleted'
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error
      });
    }
  }
};

exports.default = RedFlags;