const adminService = require('../services')
const Category = require('../models/Category');
const fs = require('fs')

const deleteProduct = async (req, res, next) => {
    const {id} = req.params;
    console.log(id)

    try{
        const deletedProduct = await adminService.deleteProduct(id);

        // Delete product images
        const images = deletedProduct.images;

        images.forEach(image => {
            const filePath = 'src/public/images/products/' + image;
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath);
            }
        })

        // Remove product from categories
        const categories = deletedProduct.categories;

        categories.forEach(async category => {
            const cat = await Category.findOne({slug: category});
            cat.products.pull(id);
            await cat.save();
        });

        res.status(200).json({
            message: 'Product deleted successfully.'
        })
    }catch(err){
        next(err)
    }
}


module.exports = deleteProduct;