'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {
        static associate(models) {
            Activity.belongsToMany(models.Teacher, {
                through: 'TeachersActivities',
                foreignKey: 'activity_id',
                otherKey: 'teacher_id'
            });
        }
    }

    Activity.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        photos: DataTypes.JSON,
        additional_info: DataTypes.JSON,
        highlighted: DataTypes.BOOLEAN,
        promotional_text: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Activity',
        tableName: 'Activities',
        timestamps: true
    });

    return Activity;
};
