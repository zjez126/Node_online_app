const mongoose = require('mongoose');
const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users'
    },
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    imgs: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model("Profile", ProfileSchema)