import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import routes from './routes/index.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors({
  origin: '*'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

// app.use('/', routes);
app.use('/api', routes);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
