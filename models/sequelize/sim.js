const Sequelize = require('sequelize');

/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object}
 */
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('sim', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        serial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'phone_number'
        },
        trackerId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'tracker_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
            defaultValue: Sequelize.NOW
        },
    }, {
        timestamps: false,
        tableName: 'sim',
    });

    model.associate = ({sim, vehicle}) => {
        sim.belongsTo(vehicle, { foreignKey: 'trackerId', targetKey: 'id' });
    };

    return model;
};
