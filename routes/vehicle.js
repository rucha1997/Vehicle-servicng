const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateVehicleInput = require('../validation/vehicle');

const Vehicle = require('../models/Vehicle');

router.post('/addVehicle', function(req, res) {

    const { errors, isValid } = validateVehicleInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Vehicle.findOne({
        no: req.body.no
    }).then(vehicle => {
        if(vehicle) {
            return res.status(400).json({
                no: 'No. already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.no, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newVehicle = new Vehicle({
                no: req.body.name,
                brand: req.body.brand,
                model: req.body.model,
                
            });
            const auth = async (req, res, next) => {
                try {
                  const token = req.header('Authorization').replace('Bearer ', '');
                  const decoded = jwt.verify(token, 'secret');
              
                  
                    const vehicle = await User.findOne({
                      _id: decoded._id,
                      name: decoded.name,
                      'tokens.token': token
                    });
              
                    if (!vehicle) {
                      throw new Error();
                    }
              
                    req.vehicle = vehicle;
                    //console.log('abc====', req.emp);
                    next();
                  
                } catch (e) {
                  res.status(401).send({ error: 'Please authenticate.' });
                }
              };
              
          
        }
    });
});



router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.vehicle.id,
        no: req.vehicle.no,
        model: req.vehicle.model,
        brand:req.Vehicle.brand
    });
});

module.exports = router;