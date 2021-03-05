var mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/test', { userMongoClient: true })
var Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // 注意：这里不要写Date.now()，因为会即刻调用
    // 当你去new Model的时候，如果你没有传递creat_time，则mongoose会调用default指定的Date.now方法，使用其返回值作默认值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  // 头像
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  // 个人简介
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
