const mongoose = require('mongoose')

// create user Schema

const { Schema } = mongoose 

const userSchema = new Schema(
    {
        name: { 
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
            max: 16,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            default: 'user',
        }
    },
    {timestamps: true}
)


module.exports = mongoose.model('User', userSchema)