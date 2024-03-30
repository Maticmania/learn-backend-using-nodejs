const Product = require("../models/Product");
const slugify = require("slugify");

// creating product function
const createProduct = async (req, res) => {
  try {
    // handle req fields (req.body)
    const { title, description, price } = req.body;
    // const { image } = req.file

    // Field Validation
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is Required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is Required" });
    }
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Price is Required" });
    }

    // check if product is been taking
    const existingProduct = await Product.findOne({ title });

    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product is existing" });
    }

    //title: Blard Product one
    //Slug: "blard-product-one"

    // create a new product object
    const product = new Product({
      title,
      description,
      price,
      slug: slugify(title),
    });

    //if image is included, handle image upload

    // save the new user to the database
    await product.save();

    return res.json({ success: true, product });
  } catch (err) {
    console.log("Error creating product", err.message);
    return res.status(500).json({ message: "Product Failed", err });
  }
};

// CRUD

//Function to get all product
const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json({
      success: true,
      message: "Product Retrived Sucessfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//function to get one product
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Product Retrived sucessfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//function to get product by slug product
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Product Retrived sucessfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const {title, description, price, isAvailable, slug} = req.body
    const { updateId } = req.params;
    // find the productbyId from the database
    const product = await Product.findById({ _id: updateId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if(title){
        const slugTitle = slugify(title)
        product.slug = slugify(title) || product.slug
    }
     //update the field
     product.title = title || product.title
     product.description = description || product.description
     product.price = price || product.price
     product.isAvailable = isAvailable || product.isAvailable
 
     //save the product
     const updatedProduct = await product.save()
 
     res.json({
       success: true,
       message: "Product Updated sucessfully",
       updatedProduct,
     });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
//delete product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    //update the field
    product.title = title || product.title
    product.description = description || product.description
    product.price = price || product.price
    product.isAvailable = isAvailable || product.isAvailable
    product.slug = slugify(title)

    //save the product
    const updatedProduct = await product.save()

    res.json({
      success: true,
      message: "Product Updated sucessfully",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProduct,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
