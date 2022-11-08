require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors);

mongoose.connect('mongodb://localhost:27017/mestodb');

// защита от автоматических запросов через лимиты (для защиты от DoS-атак)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(express.json());
app.use(requestLogger); // логгер запросов

// для защиты приложения от веб-уязвимостей путем соответствующей настройки заголовков HTTP
app.use(helmet());
app.use(limiter);
app.disable('x-powered-by');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler); // централизованная обработка ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
