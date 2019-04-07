'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Midware = {
  isValid: function isValid(req, res, next) {
    var _req$body = req.body,
        location = _req$body.location,
        comment = _req$body.comment;


    if (!location) {
      return res.status(400).json({
        status: 400,
        error: 'Input location'
      });
    }if (typeof location !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location'
      });
    }if (!location.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location'
      });
    }if (!comment) {
      return res.status(400).json({
        status: 400,
        error: 'Input comment'
      });
    }if (!comment.trim()) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid comment'
      });
    }if (comment.length < 20) {
      return res.status(400).json({
        status: 400,
        error: 'More details in comment please'
      });
    }next();
  },
  validateLocation: function validateLocation(req, res, next) {
    var location = req.body.location;

    if (!location) {
      return res.status(400).json({
        status: 400,
        error: 'Input location'
      });
    }if (typeof location !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location'
      });
    }if (!location.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location'
      });
    }next();
  },
  validateComment: function validateComment(req, res, next) {
    var comment = req.body.comment;

    if (!comment) {
      return res.status(400).json({
        status: 400,
        error: 'Input comment'
      });
    }if (!comment.trim()) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid comment'
      });
    }if (comment.length < 20) {
      return res.status(400).json({
        status: 400,
        error: 'More details in comment please'
      });
    }next();
  }
};

exports.default = Midware;