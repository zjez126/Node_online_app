module.exports = app => {
    const mongoose = require('mongoose');
    //连接mongodb数据库
    mongoose.connect('mongodb+srv://root:CYH1314@cluster0.ia5pe.mongodb.net/MISS-YOU-ONLINE?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log('MongoDb Connect')).catch(err => console.log(err))
}