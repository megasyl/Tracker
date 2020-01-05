const sequelize = require('../../database/mysql');
const fileService = require('../../services/file');

const models = fileService.getFilesFromFolder(__dirname)
    .filter((file) => (!file.includes('/index.js')) && (file.slice(-3) === '.js'))
    .reduce((loadedModels, file) => {
        const model = sequelize.import(file);
        return { ...loadedModels, [model.name]: model };
    }, {});

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = models;
