'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        static associate(models) {
            Teacher.belongsToMany(models.Activity, {
                through: 'TeachersActivities',
                foreignKey: 'teacher_id',
                otherKey: 'activity_id'
            });
        }
    }

    Teacher.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        qualification: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        photos: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },
        cv: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        }
    }, {
        sequelize,
        modelName: 'Teacher',
        tableName: 'Teachers',
        timestamps: false
    });

    return Teacher;
};
