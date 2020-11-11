const Profile = require('../models/Profile');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require('../utils/errorResponse');

//测试接口
exports.current = asyncHandler(async(req, res, next) => {
    res.json({ success: true, data: req.user })
});
//创建朋友圈

exports.create = asyncHandler(async(req, res, next) => {
    const profilesFields = {}
    if (req.body.img && req.body.name && req.body.text) {
        profilesFields.img = req.body.img
        profilesFields.name = req.body.name
        profilesFields.text = req.body.text
    }

    if (req.body.imgs) {
        profilesFields.imgs = req.body.imgs.split("|");
    }
    console.log(profilesFields);
    await Profile.create(profilesFields).then(data => {
        res.json({ success: true, data: data })
    }).catch(err => {
        return next(new ErrorResponse("参数错误", 400))
    })

})



//下拉加载
exports.latest = asyncHandler(async(req, res, next) => {
    Profile.find().sort({ createdAt: -1 }).then(data => {
        if (!data) {
            return next(new ErrorResponse("没有任何消息", 401))
        }
        let newProfile = [];
        for (let i = 0; i < 3; i++) {
            if (data[i] != null) {
                newProfile.push(data[i])
            }
        }
        res.json({ success: true, data: newProfile })
    })
})

//上拉加载
exports.pullUp = asyncHandler(async(req, res, next) => {
    Profile.find().sort({ createdAt: -1 }).then(data => {
        if (!data) {
            return next(new ErrorResponse("没有任何消息", 401))
        }
        let size = req.params.size;
        let page = req.params.page;
        let index = size * (page - 1);
        // console.log(size, page, index);
        let newProfile = [];
        for (let i = index; i < size * page; i++) {
            if (data[i] != null) {
                newProfile.unshift(data[i])
            }
        }
        res.json({ success: true, data: newProfile })
    })
})