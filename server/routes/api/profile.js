const express = require('express');
const router = express.Router();
const passport = require('passport');
//引入方法
const { current, create, latest, pullUp } = require('../../controllers/profile');
//$route api/profile
router.route('/current').get(current)
router.route('/create').post(passport.authenticate("jwt", { session: false }), create)
router.route('/latest').get(passport.authenticate("jwt", { session: false }), latest)
router.route('/:page/:size').get(passport.authenticate("jwt", { session: false }), pullUp)


module.exports = router