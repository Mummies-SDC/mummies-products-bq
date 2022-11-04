const express = require('express');
const db = require('./db.js');

const app = express();
const port = 3001;

app.use(express.json());

/* app.get('/product', controller.getProduct);
app.get('/features', controller.getFeatures);
app.get('/related', controller.getRelated);
app.get('/styles', controller.getStyles);
app.get('/skus', controller.getSkus);
app.get('/photos', controller.getPhotos); */

app.listen(port);
console.log('db is ', db);
console.log(`Listening at http://localhost:${port}`)