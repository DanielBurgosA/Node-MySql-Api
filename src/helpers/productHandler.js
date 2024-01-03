const { Product, Variant } = require('../../sequelize.config');

const getAllProductsWithVariant = async () => {
    try {
      const products = await Product.findAll({
        include: [{ model: Variant, as: 'variants' }] // Asociación con Variant utilizando el alias 'variants'
      });
      return products;
    } catch (error) {
      throw error;
    }
  };

  module.exports = {getAllProductsWithVariant}