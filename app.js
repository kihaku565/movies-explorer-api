require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { limiter, devDatabaseUrl } = require('./utils/config');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;

const app = express();

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter); // подключаем rate-limiter

app.use(cors());

app.use(bodyParser.json()); // для собирания JSON-формата

app.use(helmet()); // настраиваем заголовки

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // мидлвара централизованного обработчика ошибок

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : devDatabaseUrl);

app.listen(PORT);
