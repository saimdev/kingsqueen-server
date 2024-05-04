const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors')
const routes = require('./routes');
const path = require('path');

const {CustomError} = require('./utils')
const passportConfg = require('./config/passportConfig')
const userControllers = require('./api/user/controllers')


// Midlewares
app.use(cors({
    origin: true,
    credentials: true
}));

// stripe webhook route
app.post('/stripe-webhook', express.raw({type: 'application/json'}), userControllers.stripeWebhook);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(passportConfg.initialize());

// Static directory
app.use(express.static(path.join(__dirname, 'public/images')));

// Routes
app.use(routes);

app.get('/health', (req, res)=>{
    res.status(200).json({
        health: 'ok'
    })
})

// Global Error Handler
app.use((error, _req, res, _next)=>{
    console.log(error);

    if(!(error instanceof CustomError)){
        return res.status(500).json({
            message: 'Something went wrong.'
        });
    }
    
    let response = {
        message: error.message,
    };
    if(error.data) response.data = error.data;
    res.status(error.status).json(response);
})


module.exports = app;