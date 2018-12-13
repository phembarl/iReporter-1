import express from 'express';
import interventions from '../controllers/interventions';
import midware from '../middleware/validate';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/interventions', auth.verifyToken, interventions.getAllInterventions);

router.get('/interventions/:id', auth.verifyToken, interventions.getSingleIntervention);

router.post('/interventions', midware.isValid, auth.verifyToken, interventions.createIntervention);

router.patch('/interventions/:id/location', auth.verifyToken, midware.validateLocation, interventions.editLocation);

router.patch('/interventions/:id/comment', auth.verifyToken, midware.validateComment, interventions.editComment);

router.delete('/interventions/:id', auth.verifyToken, interventions.deleteIntervention);


export default router;
