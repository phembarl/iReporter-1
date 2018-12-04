import express from 'express';
import controllers from '../controllers/red-flags.js';

const router = express.Router();

router.get('/red-flags', controllers.getRedFlags);

export default router;