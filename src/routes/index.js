const router = require('express').Router();
const productRouter = require('./adminRouter');
const userRouter = require('./userRouter')


/* Admin Routes */
router.use('/admin', productRouter);


/* User Routes */
router.use('/', userRouter)



module.exports = router;