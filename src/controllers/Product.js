const processJSONLFile = require('../helpers/readFileLineByLine');
const {
  createProduct,
  createVariant,

  getAllProductsWithVariant,
  getAllProduct,
  getProductById,
  updateProduct,
  updateVariant,
  deleteProductById,
  deleteVariantById
} = require('../handlers/productHandler');

const importAll = async (req, res) => {
  try {
    const ans = await processJSONLFile();
    res.status(200).json(ans);
  } catch (error) {
    if (error.code === 'ENOENT')
      res.status(404).json({ error: 'File not found' });
    else if (error.name === 'SyntaxError')
      res.status(400).json({ error: 'Invalid JSON format' });
    else
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProducts = async (req, res) => {
  try {
    const product = req.body;
    if (!product)
      return res.status(422).json({ error: 'Bad Request - Missing info' });

    const newProduct = await createProduct(product);
    if (!newProduct) 
      return res.status(400).json({ error: 'Bad Request - Unable to create product' });

    return res.status(201).json({ message: 'New product created', newProduct });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createVariants = async (req, res) => {
  try {
    const variantData = req.body;
    if (!variantData || !variantData.id || !variantData.productId)
    return res.status(422).json({ error: 'Bad Request - Missing or invalid varian o product ID' });

    const missingFields = [];

    Object.values(variantData).forEach((vdata, i)=> {
      if(!vdata||vdata==='') missingFields.push(Object.keys(variantData)[i])
    });
    if (missingFields.length > 0)
      return res.status(422).json({ error: `Bad Request - Missing or invalid fields: ${missingFields.join(', ')}` });

    const newVariant = await createVariant(variantData);
    if (!newVariant)
      return res.status(400).json({ error: 'Bad Request - Unable to create variant' });

    return res.status(201).json({ message: 'New variant created', newVariant });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProductsWithVariants = async (req, res) => {
  try {
    const productsWithVariants = await getAllProductsWithVariant();
    if (!productsWithVariants || productsWithVariants.length === 0) 
      return res.status(404).json({ error: 'Products with variants not found' });

    return res.status(200).json(productsWithVariants);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await getAllProduct();
    if (!allProducts || allProducts.length === 0)
      return res.status(404).json({ error: 'Products not found' });

    return res.status(200).json(allProducts);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getProductsById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(id);
    if (!product) 
      return res.status(404).json({ error: `Product with ID ${id} does not exist` });

    return res.status(200).json(product);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    if (!id || !updates || Object.keys(updates).length === 0)
      return res.status(400).json({ error: 'Bad Request - Invalid ID or empty update data' });
    
    const updatedProduct = await updateProduct(id, updates);
    if (!updatedProduct) 
      return res.status(404).json({ error: `Product with ID ${id} does not exist` });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateVariants = async (req, res) => {
  try {
    const id = req.params.id;
    const productId = req.params.productId;
    const updates = req.body;
    if (!id || !productId || !updates || Object.keys(updates).length === 0)
      return res.status(400).json({ error: 'Bad Request - Invalid IDs or empty update data' });
    
    const updatedVariant = await updateVariant(id, productId, updates);
    if (!updatedVariant) 
      return res.status(404).json({ error: `Variant with ID ${id} does not exist for product ${productId}` });

    return res.status(200).json(updatedVariant);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteVariants = async (req, res) => {
  try {
    const id = req.params.id;
    const productId = req.params.productId;
    if (!id || !productId) 
      return res.status(400).json({ error: 'Bad Request - Invalid IDs' });
    
    const deletedVariant = await deleteVariantById(id, productId);
    if (!deletedVariant) 
      return res.status(404).json({ error: `Variant with ID ${id} does not exist for product ${productId}` });

    return res.status(200).json(deletedVariant);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') 
      return res.status(422).json({ error: error.message });
    else
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await deleteProductById(id);
    if (!deletedProduct) 
      return res.status(404).json({ error: `Product with ID ${id} does not exist` });
    
    return res.status(200).json(deletedProduct);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(422).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
  

module.exports = {
  importAll,
  getAllProductsWithVariants,
  getAllProducts,
  createProducts,
  createVariants,
  getProductsById,
  updateProducts,
  updateVariants,
  deleteProducts,
  deleteVariants,
};