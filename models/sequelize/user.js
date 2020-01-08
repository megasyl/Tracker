const Sequelize = require('sequelize');

/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object}
 */
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'email',
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'phone_number',
        },
        password: {
            type: DataTypes.STRING(36),
            allowNull: false,
            field: 'password',
        },
        roleId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'role_id',
        },
        clientId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'client_id',
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'deleted',
            defaultValue: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'disabled',
            defaultValue: false,
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
        tableName: 'user',
    });

    model.associate = ({role, user}) => {
        user.hasOne(role);
    };

    return model;
};
