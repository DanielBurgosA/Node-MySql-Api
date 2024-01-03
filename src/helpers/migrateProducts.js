const { Product, Variant } = require('../../sequelize.config');

const migrateProducts = async (dataArray) => {
  try {
    const products = [];
    const variants = [];

    dataArray.forEach((product) => {
      const productData = {
        id: product.id,
        title: product.title,
        description: product.description,
        vendor: product.vendor,
      };
      products.push(productData);
      variants.push(...product.variants)
    });

    await Product.bulkCreate(products, { ignoreDuplicates: true });
    await Variant.bulkCreate(variants, {ignoreDuplicates: true})
  }
  catch (error) {
    console.error('Error inserting data:', error);
  }
};

module.exports = migrateProducts;