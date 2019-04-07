import jwt from 'jsonwebtoken';
import db from '../models/connect';


const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        error: 'token is not provided',
      });
    }
    try {
      const decrypted = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM Users WHERE id = $1';
      const { rows } = await db.query(text, [decrypted.userId]);
      if (!rows[0]) {
        return res.status(400).json({
          message: 'Invalid token',
        });
      }
      req.user = { id: decrypted.userId };
      next();
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },
};
export default Auth;
