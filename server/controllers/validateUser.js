import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../../sec';
// import db from '../models/connect';

// const user = (req, res) => {
//   const { firstname, lastname, othernames,
//     email, phoneNumber, username, registered,
//     isAdmin,
//   } = req.body;

//   data.connect((err) => {
//     if (err) {
//       return res.json({
//         status: 500,
//         error: 'Could not conect to server',
//       });
//     }
//   });
// };

class ValidateUser {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  isValidEmail(email) {
    return /\S+@\S+/.test(email);
  }

  generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET || secret, { expiresIn: '7d' });
    return token;
  }
}

export default new ValidateUser();
