const Product = require('../../admin/models/Product');

const productSearch = async (req, res, next) => {
    try{

        const {search} = req.query;
        const products = await Product.find({title: new RegExp(search, 'i')}).limit(10).exec();
        res.status(200).json({
            ok: true,
            data: products
        })

    }catch(err){
        next(err)
    }
}

module.exports = productSearch;