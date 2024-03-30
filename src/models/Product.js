const mongoose = require('mongoose')

// create Product Schema

const { Schema } = mongoose 

const productSchema = new Schema(
    {
        title: { 
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            require: true,
            trim: true
        },
        image: {
            type: String,

        },
        imagePublicId:{
                type: String
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            default: 'product',
        },
        slug: {
            type: String,
            toLowerCase: true,
            unique: true
        }
    },
    {timestamps: true}
)


module.exports = mongoose.model('Product', productSchema)