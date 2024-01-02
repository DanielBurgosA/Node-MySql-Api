const { Product, Variant } = require('./models');

const migrateProducts = async (dataArray) => {
  try {
    const products = [];
    const variants = [];

    dataArray.forEach((item) => {
      const productData = {
        id: item.id,
        title: item.title,
        description: item.description,
        vendor: item.vendor,
      };
      products.push(productData);

      item.variants.forEach((variantItem) => {
        const variantData = {
          id: variantItem.id,
          variantTitle: variantItem.variantTitle,
          price: variantItem.price,
          availableQuantity: variantItem.availableQuantity,
          availableForSale: variantItem.availableForSale,
          variantPosition: variantItem.variantPosition,
        };

        
      });
    });


    await Product.bulkCreate(products, { ignoreDuplicates: true });


    for (const [productId, variants] of variantsByProduct) {
      await Variant.bulkCreate(variants, { ignoreDuplicates: true });

      const product = await Product.findByPk(productId);
      if (product) {
        await product.setVariants(variants);
      }
    }

    console.log('Data inserted successfully into the database');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

module.exports = migrateProducts;