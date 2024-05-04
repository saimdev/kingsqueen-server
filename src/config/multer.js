const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'src/public/images/products/')
//     },
//     filename: function (req, file, cb) {
//         console.log('multer', file)
//         const fileName = 'product-' + Date.now() + '-' + file.originalname;
//         cb(null, fileName);
//     }
// })

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;