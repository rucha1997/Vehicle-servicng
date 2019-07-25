const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    no: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        
    },
    model: {
        type: String,
       
    }
    
});

const User = mongoose.model('vehicle', VehicleSchema);

module.exports = VehicleSchema;