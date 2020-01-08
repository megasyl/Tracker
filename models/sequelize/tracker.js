const Sequelize = require('sequelize');

/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object}
 */
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('tracker', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        imei: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'imei',
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'deleted',
            defaultValue: false,
        },
        simId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'sim_id',
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
        tableName: 'tracker',
    });

    model.associate = ({sim, tracker}) => {
        tracker.hasOne(sim, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    };

    return model;
};
