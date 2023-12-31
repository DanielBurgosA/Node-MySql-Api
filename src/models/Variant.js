const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('variant', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        variantTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false,
        },
        availableQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availableForSale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        variantPosition: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{ timestamps: false })
};