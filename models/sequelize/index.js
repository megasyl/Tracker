const fs = require('fs');
const sequelize = require('../../database/mysql');

const path = `${process.cwd()}/models/sequelize`;
const files = fs.readdirSync(path).reduce((result, filename) => {
    const dirPath = `${path}/${filename}`;
    return [...result, dirPath];
}, []);

const models = files
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

return models;
