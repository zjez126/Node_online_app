module.exports = app => {
    const mongoose = require('mongoose');
    //连接mongodb数据库
    mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log('MongoDb Connect')).catch(err => console.log(err))
}