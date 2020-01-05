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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at',
            defaultValue: Date.now()
        },
    }, {
        timestamps: false,
        tableName: 'tracker',
    });

    model.associate = (models) => {

    };

    return model;
};
