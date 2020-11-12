const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../../../../Node_Vue_Blog/serve/models/User');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "请填写用户名"],
        maxlength: [50, "最多50个字"],
    },
    email: {
        type: String,
        required: [true, "请填写邮箱地址"],
        unique: true,
        trim: true,
        match: [
            /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            "请填写合法的邮箱地址"
        ]
    },
    password: {
        type: String,
        required: [true, "请填写密码"],
        minlength: [8, "最少8位密码"],
        select: false
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

//保存前用bcrypt 进行密码加密
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

//密码匹配
UserSchema.methods.matchPassword = function(pwd) {
    // console.log(this.password);
    // console.log(pwd);
    return bcrypt.compareSync(pwd, this.password);
};
//设置token
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id, name: this.name, avatar: this.avatar }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

module.exports = mongoose.model("User", UserSchema)