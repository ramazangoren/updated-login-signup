const express = require('express');
const controller = require('../controllers/pagesController');
const router = express.Router();

router.get('/',controller.home);

router.get('/login',controller.login)
router.post('/home',controller.userLogin);

router.get('/signup',controller.signup)
router.post('/signup', controller.register);

router.get('/forgotpassword',controller.forgotpassword)
router.post('/resetpassword',controller.resetPassword)

router.get('*',controller.fail)
module.exports = router;