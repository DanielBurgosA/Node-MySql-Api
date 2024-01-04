const express = require('express');
const rProducts= express.Router();

//controllers
const {importAll,
createProducts,
createVariants,
getAllProductsWithVariants,
getAllProducts,
getProductsById,
updateProducts,
updateVariants,
deleteProducts,
deleteVariants} = require('../controllers/Product')

//post
rProducts.post('/import', importAll);
rProducts.post('/product', createProducts)
rProducts.post('/variant', createVariants)

// GETS
rProducts.get('/all', getAllProductsWithVariants);
rProducts.get('/allProducts', getAllProducts);
rProducts.get('/products/:id', getProductsById);

//upDate
rProducts.put('/product', updateProducts)
rProducts.put('/variant', updateVariants)

//delete
rProducts.delete('/product', deleteProducts)
rProducts.delete('/variant', deleteVariants)

module.exports = rProducts