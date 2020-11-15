const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    count: {
        type: Number
    },
    user_id: {
        type: String,
        required: true
    },
    message: [{
        source: {
            type: String,
            required: true
        },
        msg: {
            type: String,
            required: true
        }
    }],
    target: {
        avatar: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Message", MessageSchema)