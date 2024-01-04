const processJSONLFile = require('../helpers/readFileLineByLine');
const {
  createProduct,
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
    res.status(400).json({ error: error.message });
  }
};

const createProducts = async (req, res) => {
  try {
    const product = req.body;
    if (product?.id) {
      const newProduct = await createProduct(product); // Added 'await' here
      res.status(201).json({ message: 'New product created', newProduct });
    } else res.status(422).json({ message: 'Unprocessable Entity' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createVariants = async (req, res) => {
    try {
      const variantData = req.body;
      if (variantData) {
        const newVariant = await createVariant(variantData);
        res.status(201).json({ message: 'New variant created', newVariant });
      } else {
        res.status(422).json({ message: 'Unprocessable Entity' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const getAllProductsWithVariants = async (req, res) => {
  try {
    const ans = await getAllProductsWithVariant();
    res.status(200).json(ans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const ans = await getAllProduct();
    res.status(200).json(ans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const id = req.params.id;
    const ans = await getProductById(id);
    if (!ans) res.status(404).json({ error: `Product with id ${id} does not exist` }); // Changed 'productId' to 'id'
    res.status(200).json(ans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProducts = async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body
      const ans = await updateProduct(id, updates);
      if (!ans) res.status(404).json({ error: `Product with id ${id} does not exist` }); // Changed 'productId' to 'id'
      res.status(200).json(ans);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateVariants = async (req, res) => {
    try {
      const id = req.params.id;
      const productId = req.body.productId
      const updates = req.body
      const ans = await updateVariant(id, productId, updates);
      if (!ans) res.status(404).json({ error: `Variant with id ${id} does not exist` }); // Changed 'productId' to 'id'
      res.status(200).json(ans);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //delete
  const deleteVariants = async (req, res) => {
    try {
      const id = req.params.id;
      const productId = req.body.productId
      const ans = await deleteVariantById(id, productId);
      if (!ans) res.status(404).json({ error: `Variant with id ${id} does not exist` }); // Changed 'productId' to 'id'
      res.status(200).json(ans);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteProducts = async (req, res) => {
    try {
      const id = req.params.id;
      const ans = await deleteProductById(id);
      if (!ans) res.status(404).json({ error: `Product with id ${id} does not exist` }); // Changed 'productId' to 'id'
      res.status(200).json(ans);
    } catch (error) {
      res.status(400).json({ error: error.message });
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