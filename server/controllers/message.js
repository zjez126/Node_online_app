const Message = require('../models/Message');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require('../utils/errorResponse');

// $route  POST api/msg/addmsg
// @desc   添加消息记录
// @access private
exports.addMsg = asyncHandler(async(req, res, next) => {
    const msgFields = {}
        //判断用户是否存在
    Message.findOne({ target: req.body.target, user_id: req.body.user_id })
        .then(profile => {
            // console.log(profile);
            if (!profile) {

                console.log(123456);
                if (req.body.target) msgFields.target = req.body.target;
                if (req.body.user_id) msgFields.user_id = req.body.user_id;
                msgFields.count = req.body.count;
                if (req.body.message) msgFields.message = req.body.message;
                new Message(msgFields).save().then(profile => res.json(profile));
            } else {
                profile.message = req.body.message;
                profile.count = req.body.count;
                profile.save().then(profile => res.json(profile));
            }
        })


})

// $route  GET api/msg/:user_id
// @desc   获取用户的所有消息记录
// @access private
exports.getMsg = asyncHandler(async(req, res, next) => {
    Message.find().then(msg => {
        if (!msg) {
            return next(new ErrorResponse("无任何消息", 401))
        }
        let result = msg.filter(msg => {
            return msg.user_id == req.params.user_id
        })
        res.json({ success: true, data: result })
    })

})