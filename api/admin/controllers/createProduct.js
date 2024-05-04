const { formattedValidationResult, CustomError } = require('../../../utils');
const fsPromise = require('fs').promises;
const adminService = require('../services')
const Category = require('../models/Category');


const createProduct = async (req, res, next) => {
    try {
        const {title, description, price, discount_price, stock, colors, sizes} = req.body;
        const categories = JSON.parse(req.body.categories);

        const validationErrors = formattedValidationResult(req);

        if (validationErrors) {
            throw new CustomError(400, 'Check input fields again', validationErrors);
        }

        // Upload product images
        const files = req.files;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            const fileName = 'product-' + Date.now() + '-' + files[i].originalname;
            const fileDir = 'src/public/images/products/' + fileName;
            await fsPromise.writeFile(fileDir, files[i].buffer);

            images.push(fileName);
        }

        // Save product to database
        const createdProduct = await adminService.createProduct({title, description, price, discount_price, stock, colors, sizes, categories, images});

        // Update categories
        for (let i = 0; i < categories.length; i++) {
            const category = await Category.findOne({slug: categories[i]});
            category.products.push(createdProduct._id);
            await category.save();
        }

        res.status(201).json({
            message: 'Product created successfully',
            data: createdProduct
        })

    } catch (err) {
        next(err);
    }
}


module.exports = createProduct;