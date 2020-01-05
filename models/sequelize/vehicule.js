/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object}
 */
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('vehicule', {
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
            allowNull: false,
            field: 'tracker_id',
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'user_id',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
    }, {
        timestamps: false,
        tableName: 'vehicule',
    });

    model.associate = (models) => {
        const trackerModel = models.tracker;
        const userModel = models.user;
        trackerModel.belongsTo(models.vehicule, { foreignKey: 'trackerId', targetKey: 'id' });
        userModel.belongsTo(models.vehicule, { foreignKey: 'userId', targetKey: 'id' });
    };

    return model;
};
