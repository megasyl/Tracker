/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object}
 */
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name',
        },
    }, {
        timestamps: false,
        tableName: 'role',
    });

    model.associate = ({role, user}) => {
        role.belongsTo(user, { foreignKey: 'role_id', targetKey: 'id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    };

    return model;
};
