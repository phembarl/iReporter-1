import express from 'express';
import controllers from '../controllers/red-flags.js';

const router = express.Router();

router.get('/red-flags', controllers.getRedFlags);

router.get('/red-flags/:id', controllers.getRedFlag);

export default router;
