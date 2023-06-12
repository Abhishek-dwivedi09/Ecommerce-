const Product = require("../model/productModel");
const ErrorHander = require("../utils/errorhandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// create products ---Admin
exports.createProduct = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  }
);

// Get All Products
exports.getAllProducts = catchAsyncErrors(
  async (req, res) => {

    const apiFeature = new ApiFeatures(Product.find(), req.query.search())
    const products = await apiFeature.query;
    res.status(201).json({
      success: true,
      products,
    });
  }
  
)

//update product
exports.updateProduct = catchAsyncErrors(
  async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    })
  }
)


// Delete Products

exports.deleteProduct = catchAsyncErrors(
  async(req, res, next)=>{

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("product not found", 404))
      }
      await product.deleteOne()
      res.status(200).json({
        success: true,
        message: "product deleted successfully",
      })
}
)


// Get Singel Products
 
exports.getProductDetail = catchAsyncErrors(
  async(req, res, next)=>{

    const product =  await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("product not found", 404))
    }
    
      res.status(200).json({
        success: true,
        product
      })
}
)