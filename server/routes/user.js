import express from 'express';
import user from '../controllers/user';
// import midware from '../middleware/validate';

const router = express.Router();

router.post('/auth/signup', user.createUser);

router.post('/auth/login', user.login);

export default router;
