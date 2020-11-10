const User = require('../models/User');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require('../utils/errorResponse');
const gravatar = require('gravatar');

//注册
exports.register = asyncHandler(async(req, res, next) => {
    const avatar = gravatar.url(req.body.avatar, { s: '200', r: 'pg', d: 'mm' });
    await User.create({
        email: req.body.email,
        password: req.body.password,
        avatar,
        name: req.body.name
    }).then(data => {
        res.json({ success: true, data: data })
    }).catch(err => {
        return next(new ErrorResponse("邮箱已存在", 400))
    })
})

//登录

exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    //判断email, password是否存在
    if (!email || !password) {
        return next(new ErrorResponse("邮箱或密码为空", 401));
    }
    const user = await User.findOne({ email }).select("+password");
    //判断是否找到该用户
    if (!user) {
        return next(new ErrorResponse("此用户不存在", 401));
    }
    //进行密码匹配
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse("密码错误", 401))
    }
    const token = await user.getSignedJwtToken()
    res.json({ success: true, token })
});

//current

exports.current = asyncHandler(async(req, res, next) => {
    res.json({ success: true, data: req.user })
})