import express from 'express';
import routes from '../controllers/redFlags';
import controllers from '../controllers/red-flags.js';

const router = express.Router();

router.get('/red-flags', routes.getRedFlags);

router.post('/red-flags', routes.createRedFlag);

router.get('/red-flags/:id', routes.getRedFlag);

export default router;
