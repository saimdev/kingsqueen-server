const { parse } = require("dotenv");
const Product = require("../models/Product");

const getAllDiscountedProducts = async ({
  page,
  limit,
  sort,
  order,
  categories = [],
  sizes,
  colors,
  discount,
  search = "",
}) => {
  const skip = page * limit - limit;
  const categoryRegex = categories.map(
    (category) => new RegExp(`^${category}`)
  );

  let query = {};
  if (categories.length > 0) {
    query.categories = { $in: categoryRegex };
  }

  if (sizes.length > 0) {
    query.sizes = { $in: sizes };
  }

  if (search) {
    query.title = new RegExp(search, "i");
  }

  if (colors.length > 0) {
    query.colors = { $in: colors };
  }

  const products = await Product.aggregate([
    {
      $addFields: {
        discountPercentage: {
          $multiply: [
            {
              $divide: [{ $subtract: ["$price", "$discountPrice"] }, "$price"],
            },
            100,
          ],
        },
      },
    },
    {
      $match: {
        $and: [
          { discountPercentage: { $lte: discount } },
          {
            createdAt: {
              $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          }, // Filter products created within the last 7 days
        ],
      },
    },
  ])
    .sort({ [sort]: order })
    .skip(skip)
    .limit(limit)
    .exec();

  // const products = await Product.find(query)
  // .sort({ [sort]: order })
  // .skip(skip)
  // .limit(limit)
  // .exec();

  const totalCount = await Product.countDocuments();

  return {
    products,
    totalCount,
  };
};

module.exports = getAllDiscountedProducts;
