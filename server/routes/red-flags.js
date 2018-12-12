import express from 'express';
import redFlags from '../controllers/redFlags';
import midware from '../middleware/validate';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/red-flags', auth.verifyToken, redFlags.getAllRedFlags);

router.get('/red-flags/:id', auth.verifyToken, redFlags.getSingleRedFlag);

router.post('/red-flags', auth.verifyToken, midware.isValid, redFlags.createRedFlag);

router.patch('/red-flags/:id/location', auth.verifyToken, midware.validateLocation, redFlags.editLocation);

router.patch('/red-flags/:id/comment', auth.verifyToken, midware.validateComment, redFlags.editComment);

router.delete('/red-flags/:id', auth.verifyToken, redFlags.deleteRedFlag);


export default router;
