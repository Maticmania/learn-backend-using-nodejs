const mongoose = require('mongoose')

const connectdb = (url) => {
    mongoose
    .connect(url)
    .then(()=> console.log('DB connectd sucessfully'))
    .catch((err)=> console.log('Error connecting to MongoDb', err.message))
}

module.exports = { connectdb };