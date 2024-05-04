const adminServices = require('../services')

const getSingleProduct = async (req, res, next) => {
    const {id} = req.params

    try{
        const product = await adminServices.getSingleProduct(id);
        
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            data: product
        })
    }catch(err){
        next(err)
    }
}


module.exports = getSingleProduct