const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require("./middleware/error")
const bodyParser = require('body-parser')
const passport = require("passport");
//设置文件路径
dotenv.config({
    path: './config/config.env'
})

const user = require('./routes/api/user')
const profile = require('./routes/api/profile')
const message = require('./routes/api/message')


const PORT = process.env.PORT || 5000

const app = express();
// 使用body-parser中间件 限制上传文件的大小
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//passport 初始化
app.use(passport.initialize());
require('./middleware/passport')(passport)



//设置路由中间件
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/msg", message);

require('./plugins/db')(app)

//引入错误处理中间件
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Running start port ${PORT}`);
})