import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/red-flags';
import router2 from './routes/interventions';
import router3 from './routes/user';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', router);
app.use('/api/v1/', router2);
app.use('/api/v1/', router3);

app.listen(port, () => {
  console.log('Your app is being served on port', port);
});

export default app;
