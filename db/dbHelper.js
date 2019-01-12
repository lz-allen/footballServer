const mongoose = require('mongoose')

// 连接成功
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connection success`)
})

// 连接失败
mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`)
})

// 连接断开
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
})


module.exports = mongoose