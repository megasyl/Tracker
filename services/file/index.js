const fs = require('fs');
class FileService {
    getFilesFromFolder(path) {
        return fs.readdirSync(path).reduce((result, filename) => {
            const dirPath = `${path}/${filename}`;
            return [...result, dirPath];
        }, []);
    }
}

module.exports = new FileService();
