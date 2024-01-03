const express = require('express');
const rProducts= express.Router();

//controllers
const {importAll,
    getAllProductsWithVariants} = require('../controllers/Product')

// GETS
rProducts.get('/import', importAll);
rProducts.get('/all', getAllProductsWithVariants);

module.exports = rProducts