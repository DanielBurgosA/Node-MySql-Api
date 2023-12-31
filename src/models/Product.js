const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        vendor: {
            type: DataTypes.STRING,
        },
    },{ timestamps: false })
};