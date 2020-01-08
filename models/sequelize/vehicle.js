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
        },
        clientId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'client',
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

    model.associate = ({vehicle, tracker, client}) => {
        vehicle.hasOne(tracker, { foreignKey: 'tracker_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
        vehicle.belongsTo(client, { foreignKey: 'client_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    };

    return model;
};
