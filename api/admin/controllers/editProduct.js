const adminServices = require('../services')
const {formattedValidationResult} = require('../../../utils')
const fs = require('fs')
const fsPromise = fs.promises
const Category = require('../models/Category')

const editProduct = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, discount_price, stock, colors, sizes } = req.body;
    const categories = JSON.parse(req.body.categories);
    let images = req.body.images;

    try {
        const validationErrors = formattedValidationResult(req);

        if (validationErrors) {
            throw new CustomError(400, 'Check input fields again', validationErrors);
        }

        const oldProduct = await adminServices.getSingleProduct(id);

        // Upload or Delete product images
        const files = req.files;
        const oldFiles = oldProduct.images;

        // Delete removed images
        for(let i=0; i<oldFiles.length; i++){
            if(!images.includes(oldFiles[i])){
                const fileDir = 'src/public/images/products/' + oldFiles[i];
                if(fs.existsSync(fileDir)){
                    await fsPromise.unlink(fileDir)
                }
            }
        }

        // Upload new images
        for(let i=0; i<files.length; i++){
            const fileName = 'product-' + Date.now() + '-' + files[i].originalname;
            const fileDir = 'src/public/images/products/' + fileName;
            await fsPromise.writeFile(fileDir, files[i].buffer);

            if(Array.isArray(images)) images = [...images, fileName];
            else if(images != undefined){
                images = [images, fileName]
            }else{
                images = [fileName]
            }
        }

        // Update categories
        // Remove product from old categories
        const oldCategories = oldProduct.categories;
        for (let i = 0; i < oldCategories.length; i++) {
            const category = await Category.findOne({ slug: oldCategories[i] });
            console.log(category)
            if(category.products?.length > 0){
                category.products = category.products.filter(product => product.toString() !== id.toString());
            }
            await category.save();
        }

        for (let i = 0; i < categories.length; i++) {
            const category = await Category.findOne({ slug: categories[i] });
            category.products.push(id);
            await category.save();
        }

        const editedProduct = await adminServices.editProduct(id, {
            title,
            description,
            price,
            discount_price,
            stock,
            colors,
            sizes,
            categories,
            images
        })

        res.status(200).json({
            message: 'Product edited successfully',
            data: editedProduct
        })

    } catch (err) {
        next(err)
    }
}


module.exports = editProduct;