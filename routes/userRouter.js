const router = require('express').Router();
const userControllers = require('../api/user/controllers');
const userValidators = require('../middlewares/validators/user');
const express = require('express');
const userAuthenticate = require('../middlewares/userAuthenticate')

router.route('/register')
    .post(userValidators.register(), userControllers.register);

router.route('/login')
    .post(userValidators.login(), userControllers.login);

router.route('/change-password')
    .post(userAuthenticate, userValidators.changePassword(), userControllers.changePassword)

router.route('/users/:id')
    .get(userControllers.getUser)


router.route('/account')
    .get(userAuthenticate, userControllers.getAccount)


router.post('/authenticate', userAuthenticate, (req, res, _next) => {
    res.status(200).json({
        ok: true,
        data: req.user
    })
})

router.route('/user-orders')
    .get(userAuthenticate, userControllers.getUserOrders)

router.route('/pending-payment/:orderId')
    .get(userAuthenticate, userControllers.getPendingPayment)

// Pyement Routes
router.post('/create-checkout-session', userAuthenticate, userControllers.createCheckoutSession);


router.post('/logout', userControllers.logout);


module.exports = router;