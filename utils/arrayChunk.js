module.exports = (array, chunkSize) => {
    const chunks = [];
    let i = 0;
    while (i < array.length) {
        chunks.push(array.slice(i, chunkSize + i));
        i += chunkSize;
    }
    return chunks;
}
