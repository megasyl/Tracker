const Sequelize = require('sequelize');

/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object}
 */
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('vehicle', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'brand',
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'model',
        },
        plate: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'plate',
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'picture',
        },
        trackerId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'tracker_id',
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'user_id',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
            defaultValue: Sequelize.fn('now')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at',
        },
    }, {
        timestamps: false,
        tableName: 'vehicle',
    });

    model.associate = (models) => {
        const trackerModel = models.tracker;
        const userModel = models.user;
        trackerModel.belongsTo(models.vehicle, { foreignKey: 'trackerId', targetKey: 'id' });
        userModel.belongsTo(models.vehicle, { foreignKey: 'userId', targetKey: 'id' });
    };

    return model;
};
