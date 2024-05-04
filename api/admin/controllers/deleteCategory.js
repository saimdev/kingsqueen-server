const Category = require('../models/Category');
const Product = require('../models/Product');
const { CustomError } = require('../../../utils');

const deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {
        const category = await Category.findById(id);

        if (!category) {
            throw new CustomError('Category not found', 404);
        }

        // Delete category
        await category.deleteOne();

        // Remove category from products
        category.products.map(async product => {
            const prod = await Product.findById(product);
            prod.categories.pull(category.slug);
            await prod.save();
        });

        // Update child categories
        const children = await Category.find({ parent: id });
        children.map(async child => {
            child.parent = category.parent;
            await child.save();
        });


        // Update parent category
        if(category.parent){
            const parentCat = await Category.findById(category.parent);
            parentCat.children.pull(id);
            parentCat.children.push(...children.map(child => child._id));
            await parentCat.save();
        }

        res.status(200).json({
            message: 'Category deleted successfully',
            data: category
        });
    } catch (err) {
        next(err)
    }
}

module.exports = deleteCategory;