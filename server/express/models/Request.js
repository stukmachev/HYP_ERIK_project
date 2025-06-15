'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Request extends Model {
        static associate(models) {
        }
    }

    Request.init({
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Request',
        tableName: 'Requests',
        timestamps: false
    });

    return Request;
};
