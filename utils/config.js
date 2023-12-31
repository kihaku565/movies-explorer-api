const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const devDatabaseUrl = 'mongodb://127.0.0.1/bitfilmsdb';

const devJwtKey = 'dev-key';

module.exports = {
  limiter,
  devDatabaseUrl,
  devJwtKey,
};
