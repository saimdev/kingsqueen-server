const createProduct = require("./createProduct");
const getAllProducts = require("./getAllProducts");
const getSingleProduct = require("./getSingleProduct");
const editProduct = require("./editProduct");
const deleteProduct = require("./deleteProduct");
const createCategory = require("./createCategory");
const getAllCategories = require("./getAllCategories");
const deleteCategory = require("./deleteCategory");
const getCategory = require("./getCategory");
const editCategory = require("./editCategory");
const getAllOrders = require("./getAllOrders");
const getOrder = require("./getOrder");
const editOrder = require("./editOrder");
const deleteOrder = require("./deleteOrder");
const getDashboard = require("./getDashboard");
const login = require("./login");
const getAllDiscountedProduct = require("./getAllDiscountedProducts");

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategory,
  editCategory,
  getAllOrders,
  getOrder,
  editOrder,
  deleteOrder,
  getDashboard,
  login,
  getAllDiscountedProduct,
};
