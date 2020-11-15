const express = require('express');
const router = express.Router();
const passport = require('passport');
//引入方法
const { addMsg, getMsg } = require('../../controllers/message');
//$route api/msg
router.route('/addMsg').post(passport.authenticate("jwt", { session: false }), addMsg)
router.route('/:user_id').get(passport.authenticate("jwt", { session: false }), getMsg)


module.exports = router