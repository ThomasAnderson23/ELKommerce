const Product = require("../models/Products");
const User = require("../models/User");

const createProduct = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id);
    console.log(user.isAdmin)
    if(!user.isAdmin){
      throw new Error('You do not have access to create new products')
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({
      success: true,
      msg: "Se ha creado un nuevo producto",
      productId: newProduct._id,
    });
  } catch (error) {
    res.json({ 
      success: false, 
      msg: error.msg });
  }
};

const getProducts = async (req, res) => {
console.log(req)

  try {
    const products = await User.find().populate("favoriteProducts");
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, msg: error.msg });
  }
};

module.exports = { createProduct, getProducts };
