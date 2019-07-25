const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVehicleInput(data) {
    let errors = {};
    data.no = !isEmpty(data.no) ? data.no : '';
    data.model = !isEmpty(data.model) ? data.model : '';
    data.brand = !isEmpty(data.brand) ? data.brans : '';
    

    if(Validator.isEmpty(data.no)) {
        errors.email = 'Car No. is required';
    }

    if(Validator.isEmpty(data.model)) {
        errors.email = 'Car model is required';
    }

    if(Validator.isEmpty(data.brand)) {
        errors.email = 'Car brand is required';
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}