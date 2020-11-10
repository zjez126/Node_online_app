const express = require('express');
const router = express.Router();
const passport = require('passport')
    //引入方法
    //$route api/user
const { register, login, current } = require('../../controllers/user');
//注册
router.route('/register').post(register);
//登录
router.route('/login').post(login)
router.route('/current').get(passport.authenticate('jwt', { session: false }), current)


module.exports = router