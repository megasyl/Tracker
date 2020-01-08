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
        kilometersAtInstall: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'kilometers_at_install',
        },
        kilometersAtUninstall: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'kilometers_at_uninstall',
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
            references: 'tracker',
            referencesKey: 'id'
        },
        clientId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'user_id',
            references: 'tracker',
            referencesKey: 'id'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
            defaultValue: Sequelize.NOW
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

    model.associate = ({tracker, client, vehicle}) => {
        tracker.belongsTo(vehicle, { foreignKey: 'trackerId', targetKey: 'id' });
        client.belongsTo(vehicle, { foreignKey: 'clientId', targetKey: 'id' });
    };

    return model;
};
