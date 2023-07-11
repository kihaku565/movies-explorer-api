const router = require('express').Router();
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validations');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/me', getUserInfo); // Вернем инфо о пользователе email и name
router.patch('/me', validateUpdateUser, updateUser); // Обновим инфо о пользователе email и name

module.exports = router;
