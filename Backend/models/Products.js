const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    stock: Number,
    image: String,
})

const Product = mongoose.model('product', productSchema)

module.exports = Product