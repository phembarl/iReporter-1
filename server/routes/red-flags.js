import express from 'express';
import redFlags from '../controllers/redFlags.js';

const router = express.Router();

router.get('/red-flags', redFlags.getAllRedFlags);

router.get('/red-flags/:id', redFlags.getSingleRedFlag);

export default router;
