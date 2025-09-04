const express = require('express');
const setupGraphQL = require('../Backend/V1/API/graphql');

const app = express();

setupGraphQL(app);

app.get('/', (req, res) => {
    res.send('Welcome to your API!');
});

module.exports = app; 