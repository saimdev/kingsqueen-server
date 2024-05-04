const Category = require('../models/Category');
const { CustomError } = require('../../../utils');

const getCategory = async (req, res, next) => {
    const id = req.params.id;

    try{
        const category = await Category.findById(id).populate('parent');

        if(!category){
            throw new CustomError('Category not found', 404);
        }

        res.status(200).json({
            message: 'Category fetched successfully',
            data: category
        });
    }catch(err){
        next(err);
    }
}

module.exports = getCategory;