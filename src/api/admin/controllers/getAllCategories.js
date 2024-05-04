const Category = require('../models/Category');

const getAllCategories = async (req, res, next) => {
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 2;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'desc';

    try{
        console.log((page * limit) - limit);
        // Get all categories with recursive children
        const parents = await Category.find({parent: null}).sort({[sort] : order}).skip((page * limit) - limit).limit(limit);

        const totalCount = await Category.countDocuments({parent: null}).exec();

        const categories = await getCategoriesWithChildren(parents, {sort, order});

        res.status(200).json({
            message: 'Categories fetched successfully',
            data: categories,
            pagination: {
                current: page,
                pageSize: limit,
                total: totalCount
            }
        });

    }catch(err){
        next(err);
    }
}

async function getCategoriesWithChildren(categories, {sort, order}) {
    for(const category of categories){
        console.log(category);
        if(category.children.length > 0){
            await category.populate({path: 'children', options: {sort: {[sort] : order}}});
            await getCategoriesWithChildren(category.children, {sort, order})
        }
    }

    return categories;
}

module.exports = getAllCategories;