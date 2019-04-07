'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = require('../models/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interventions = {
  getAllInterventions: function getAllInterventions(req, res) {
    _connect2.default.query('SELECT * FROM interventions', function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      if (result.rows.length === 0) {
        return res.json({
          message: 'It is empty over here!'
        });
      }
      return res.json({
        status: 200,
        data: result.rows
      });
    });
  },
  getSingleIntervention: function getSingleIntervention(req, res) {
    var id = Number(req.params.id);

    _connect2.default.query('SELECT * FROM interventions WHERE id = ' + id, function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'intervention record not found'
        });
      }
      return res.json({
        status: 200,
        data: result.rows
      });
    });
  },
  createIntervention: async function createIntervention(req, res) {
    var text = 'INSERT INTO interventions(createdOn, createdBy,type, location, status,images, videos, comment)\n    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';

    var values = [req.body.createdOn, req.body.createdBy, req.body.type, req.body.location, req.body.status, req.body.images, req.body.videos, req.body.comment];

    try {
      var _ref = await _connect2.default.query(text, values),
          rows = _ref.rows;

      return res.status(201).send({
        data: [{
          id: rows[0].id,
          intervention: rows[0],
          message: 'Created intervention record'
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
      var _ref2 = await _connect2.default.query('UPDATE interventions \n    SET location = $1 WHERE id = $2 returning *', [req.body.location, id]),
          rows = _ref2.rows;

      return res.status(200).send({
        status: 200,
        data: [{
          id: id,
          intervention: rows[0],
          message: 'Updated intervention record\'s location'
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
      var _ref3 = await _connect2.default.query('UPDATE interventions \n    SET comment = $1 WHERE id = $2 returning *', [req.body.comment, id]),
          rows = _ref3.rows;

      return res.status(200).send({
        data: [{
          id: id,
          intervention: rows[0],
          message: 'Updated intervention record\'s comment'
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error
      });
    }
  },
  deleteIntervention: async function deleteIntervention(req, res) {
    var id = Number(req.params.id);
    try {
      var _ref4 = await _connect2.default.query('DELETE FROM interventions \n    WHERE id = $1', [id]),
          rows = _ref4.rows;

      return res.json({
        status: 200,
        data: [{
          id: id,
          intervention: rows[0],
          message: 'intervention record has been deleted'
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

exports.default = Interventions;