const { Product, Variant } = require('../../sequelize.config');

//create
const createProduct = async (product) =>{
  const { title, description, vendor, variants } = product;

  if (!title || !description || !vendor || !Array.isArray(variants)) 
    throw new Error('Missing or invalid product data');

  let newProduct
  const transaction = await sequelize.transaction();
  try {
    newProduct = await Product.create({
      title,
      description,
      vendor,
    }, { transaction });

    const variantsP = variants.map((variant) => ({
      variantTitle: variant.variantTitle,
      price: variant.price,
      availableQuantity: variant.availableQuantity,
      availableForSale: variant.availableForSale,
      variantPosition: variant.variantPosition,
      productId: newProduct.id,
    }));

    await Variant.bulkCreate(variantsP, {
      ignoreDuplicates: true,
      transaction,
    });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
  
  return newProduct;
}

const createVariant = async (variantData) => {
  const {
    variantTitle,
    price,
    availableQuantity,
    availableForSale,
    variantPosition,
    productId
  } = variantData;

  if (!variantTitle || !price || !availableQuantity || !availableForSale || !variantPosition || !productId ) 
    throw new Error('Missing or invalid variant data');

  const newVariant = await Variant.create({
    variantTitle,
    price,
    availableQuantity,
    availableForSale,
    variantPosition,
    productId,
  });

   return newVariant;
};

//get
const getAllProductsWithVariant = async () => {
    try {
      const products = await Product.findAll({
        include: [{ model: Variant, as: 'variants' }]
      });
      return products;
    } catch (error) {
      throw error;
    }
  };

const getAllProduct = async () => {
  const products = await Product.findAll()
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id, { include: Variant });
  return product;
};

//update
const updateProduct = async (id, updates) =>{
  const product = await Product.findByPk(id);
  if (!product) return
  await product.update(updates);
  return product
}

const updateVariant = async (id, productId, updates) =>{
  const variant = await Variant.findOne({
    where: {
      id: id,
      productId: productId,
    },
  });
  if (!variant) return
  await variant.update(updates);
  return variant
}

//delete
const deleteVariantById = async (id, productId) => {
  const variant = await Variant.destroy({
    where: {
      id: id,
      productId: productId,
    },
  });
  return variant;
};

const deleteProductById = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    await Variant.destroy({
      where: {
        productId: id,
      },
      transaction,
    });

    const rowsDeleted = await Product.destroy({
      where: {
        id: id,
      },
      transaction,
    });

    await transaction.commit();
    return rowsDeleted;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

  module.exports = {createProduct,
                    createVariant,
                    getAllProductsWithVariant,
                    getAllProduct,
                    getProductById,
                    updateProduct,
                    updateVariant,
                    deleteProductById,
                    deleteVariantById}