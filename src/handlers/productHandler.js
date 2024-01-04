const { Product, Variant } = require('../../sequelize.config');

//create
const createProduct = async (product) =>{
  const newProduct = await Product.create({
    id: product.id,
    title: product.title,
    description: product.description,
    vendor: product.vendor,
  })
  await Variant.bulkCreate(product.variants, {ignoreDuplicates: true})
  
  return newProduct;
}

const createVariant = async (variantData) => {
  const newVariant = await Variant.create({
    variantTitle: variantData.variantTitle,
    price: variantData.price,
    availableQuantity: variantData.availableQuantity,
    availableForSale: variantData.availableForSale,
    variantPosition: variantData.variantPosition,
    productId: variantData.productId,
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
    try {
      const products = await Product.findAll()
      return products;
    } catch (error) {
      throw error;
    }
  };

const getProductById = async (id) => {
    try {
      const product = await Product.findByPk(id, { include: Variant });
      return product;
    } catch (error) {
      throw error;
    }
  };

//update
const updateProduct = async (id, updates) =>{
  try {
    const product = await Product.findByPk(id);
    if (!product) throw new Error (`Product with id ${id} does not exist` )
    await product.update(updates);
    return product
  } catch (error) {
    throw error;
  }
}

const updateVariant = async (id, productId, updates) =>{
  try {
    const variant = await Variant.findOne({
      where: {
        id: id,
        productId: productId,
      },
    });
    if (!variant) throw new Error (`Variant with id ${id} does not exist` )
    await variant.update(updatedData);
    return variant
  } catch (error) {
    throw error;
  }
}

//delete
const deleteVariantById = async (id, productId) => {
  try {
    const variant = await Variant.destroy({
      where: {
        id: id,
        productId: productId,
      },
    });

    return variant;
  } catch (error) {
    throw error;
  }
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