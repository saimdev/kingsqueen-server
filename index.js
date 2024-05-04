require('dotenv').config();
const app = require ('./app');
const http = require('http');
const mongoose = require('mongoose');


const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const main = async ()=>{
    try{
        // connect database
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

        server.listen(PORT, ()=>{
            console.log('Server is listening on port ' + PORT)
        })
    }catch(e){
        console.log(e)
    }
}

main();