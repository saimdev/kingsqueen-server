const { CustomError } = require("../../../utils");
const Category = require("../models/Category");

const createCategory = async (req, res, next) => {
  const { name, parent } = req.body;

  try {
    let slug = name.replace(/ /g, "-").toLowerCase();
    let parentCategory = null;

    if (parent) {
      parentCategory = await Category.findOne({ slug: parent });
      slug = `${parentCategory.slug}-${slug}`;
    }

    // Check if category already exists
    const categoryExists = await Category.find({ slug });
    if (categoryExists.length > 0) {
      slug = `${slug}-${categoryExists.length + 1}`;
    }

    // Upload product images
    // const files = req.files;
    // if (files) {
    //   const image = "product-" + Date.now() + "-" + files.originalname;
    //   const fileDir = "src/public/images/categories/" + image;
    //   await fsPromise.writeFile(fileDir, files[i].buffer);
    // }

    const category = new Category({ name, slug });
    if (parentCategory) {
      category.parent = parentCategory._id;
    }
    await category.save();

    if (parent) {
      parentCategory.children.push(category._id);
      await parentCategory.save();
    }

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createCategory;
