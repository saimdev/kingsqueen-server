const adminServices = require("../services");

const getAllProducts = async (req, res, next) => {
  const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 20;
  const sort = req.query.sort ? req.query.sort : "createdAt";
  const order = req.query.order ? req.query.order : "desc";
  const categories = req.query.categories
    ? req.query.categories.split("|")
    : [];
  const sizes = req.query.sizes ? req.query.sizes.split("|") : [];
  const colors = req.query.colors ? req.query.colors.split("|") : [];
  const search = req.query.search ? req.query.search : "";
  try {
    // Get all products

    const { products, totalCount } = await adminServices.getAllProducts({
      page,
      limit,
      sort,
      order,
      categories,
      sizes,
      colors,
      search,
    });
    res.status(200).json({
      data: products,
      pagination: {
        current: page,
        pageSize: limit,
        total: totalCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllProducts;
