const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validations');
const { URL_NOT_FOUND } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

router.post('/signup', validateCreateUser, createUser); // Создаем пользователя с name, email и password
router.post('/signin', validateLogin, login); // Проверим переданные почту и пароль и вернем JWT

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(auth); // Защитим роуты, которым нужна авторизация
router.use('*', (req, res, next) => { // Обработаем некорректный маршрут и вернём ошибку 404
  next(new NotFoundError(`${URL_NOT_FOUND} ${req.originalUrl} `));
});

module.exports = router;
