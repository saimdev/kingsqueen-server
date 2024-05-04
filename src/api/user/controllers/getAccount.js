
const getAccount = async (req, res, next) => {
    try {

        res.status(200).json({
            message: 'User fetched successfully',
            data: {
                user: req.user
            }
        })

    }catch(err){
        next(err)
    }
}

module.exports = getAccount;