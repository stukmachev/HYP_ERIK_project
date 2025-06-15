'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Activity, {
                foreignKey: 'activity_category_id',
                as: 'activities'
            });
        }
    }

    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photos: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Categories',
        timestamps: true
    });

    return Category;
};
