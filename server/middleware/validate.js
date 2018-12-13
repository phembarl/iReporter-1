const Midware = {
  isValid(req, res, next) {
    const { location, comment } = req.body;

    if (!location) {
      return res.status(400).json({
        status: 400,
        error: 'Input location',
      });
    } if (typeof (location) !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location',
      });
    } if (!location.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location',
      });
    } if (!comment) {
      return res.status(400).json({
        status: 400,
        error: 'Input comment',
      });
    } if (!comment.trim()) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid comment',
      });
    } if (comment.length < 20) {
      return res.status(400).json({
        status: 400,
        error: 'More details in comment please',
      });
    } next();
  },

  validateLocation(req, res, next) {
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({
        status: 400,
        error: 'Input location',
      });
    } if (typeof (location) !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location',
      });
    } if (!location.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid location',
      });
    } next();
  },

  validateComment(req, res, next) {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({
        status: 400,
        error: 'Input comment',
      });
    } if (!comment.trim()) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid comment',
      });
    } if (comment.length < 20) {
      return res.status(400).json({
        status: 400,
        error: 'More details in comment please',
      });
    } next();
  },
};

export default Midware;
