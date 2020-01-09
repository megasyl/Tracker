const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../router');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '1MB' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);


app.listen(8080, () => {
    console.log(`Express listening on port 8080 ...`);
});

module.exports = app;
