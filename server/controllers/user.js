// import moment from 'moment';
import db from '../models/connect';
import validateUser from './validateUser';

const User = {
  async createUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'input email address and password',
      });
    }
    if (!validateUser.isValidEmail(req.body.email)) {
      res.status(400).json({
        message: 'Input a valid email address',
      });
    }
    const hashPassword = validateUser.hashPassword(req.body.password);

    const newUser = `INSERT INTO Users(firstname, lastname, othernames, email,
    password, phoneNumber, username)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;

    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      hashPassword,
      req.body.phoneNumber,
      req.body.username,
    ];

    try {
      const { rows } = await db.query(newUser, values);
      const userToken = validateUser.generateToken(rows[0].id);
      return res.status(201).json({ token: userToken });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          error: 'User with that email already exists',
        });
      }
      return res.status(400).json({
        error,
      });
    }
  },

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'input email address and password',
      });
    }
    if (!validateUser.isValidEmail(req.body.email)) {
      res.status(400).json({
        message: 'Input a valid email address',
      });
    }
    const text = 'SELECT * FROM Users WHERE email = $1';

    try {
      const { rows } = await db.query(text, [req.body.email]);

      if (!rows[0]) {
        return res.status(400).json({
          message: 'account does not exist',
        });
      }
      if (!validateUser.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          error: 'incorrect email or password',
        });
      }
      const token = validateUser.generateToken(rows[0].id);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(200).json({ error });
    }
  },
};

export default User;
