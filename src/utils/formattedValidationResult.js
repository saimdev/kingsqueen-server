const {validationResult} = require('express-validator');

const fromatedValidationResult = (req)=>{
    const result = validationResult(req).formatWith(error => error.msg);
    if(result.isEmpty()){
        return false;
    }
    
    return result.mapped();
}

module.exports = fromatedValidationResult;