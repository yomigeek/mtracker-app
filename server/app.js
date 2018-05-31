import 'babel-core/register';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import badRequest from './validations/badRequest';

// Setting up the express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Ensures incoming data are parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../public'));

// Application routes
app.use('/api/v1/', routes);

app.get('/', (req, res) => res.redirect('https://mtracker1.docs.apiary.io'));

app.use(badRequest);

app.listen(port, () => { console.log('server started'); });

export default app;
