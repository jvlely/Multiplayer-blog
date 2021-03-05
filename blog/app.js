var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))

// 在node中，有很多第三方的模板引擎可使用，这里使用art-template
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认渲染views目录

// 配置解析表单请求头插件，一定要放在router之前
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 在express框架中，默认不支持session和cookie，但我们可以使用第三方中间件来解决
// 1. npm install express-session
// 2. 配置(在router之前)
// 3. 使用，通过req.session来访问和设置session成员
app.use(session({
  secret: 'itcast', // 配置加密字符串，会在原有加密基础上和这个字符串拼接起来去加密，目的是增加安全性
  resave: false,
  saveUninitialized: true // 无论你是否使用session，都默认分配你一把钥匙
}))

// 把路由挂载到app中
app.use(router)

// 配置一个出来404的中间件
app.use(function (req, res) {
  res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen('5000', function () {
  console.log('running...')
})
