

const getUser = async (req, res, next)=>{
    try{

        res.status(200).json({
            message: 'User fetched successfully',
            data: 'User data here'
        })

    }catch(err){
        next(err)
    }
}

module.exports = getUser;