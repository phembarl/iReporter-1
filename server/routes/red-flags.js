import express from 'express';
import redFlags from '../controllers/redFlags';
import midware from '../middleware/validate'

const router = express.Router();

router.get('/red-flags', redFlags.getAllRedFlags);

router.get('/red-flags/:id', redFlags.getSingleRedFlag);

router.post('/red-flags', midware.isValid, redFlags.createRedFlag);

router.patch('/red-flags/:id/location', midware.validateLocation, redFlags.editLocation);

router.patch('/red-flags/:id/comment',midware.validateComment, redFlags.editComment);

router.delete('/red-flags/:id', redFlags.deleteRedFlag);


export default router;
