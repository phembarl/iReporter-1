import express from 'express';
import redFlags from '../controllers/redFlags';
import midware from '../middleware/validate'

const router = express.Router();

router.get('/red-flags', redFlags.getAllRedFlags);

router.get('/red-flags/:id', redFlags.getSingleRedFlag);

router.post('/red-flags', midware.isValid, redFlags.createRedFlag);


export default router;
