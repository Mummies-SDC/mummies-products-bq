const models = require('./models.js');

module.exports = {
  getProduct: function (req, res) {
    Promise.all([models.getProductInfo(req.query.id), models.getFeatures(req.query.id)])
      .then((response)=>{
        let product = response[0].rows[0];
        let features = response[1].rows;
        product.features = features;
        res.status(200).json(product)
      }).catch((err)=>{
        res.sendStatus(404);
      })
  },

  getStyles: function (req, res) {
    let photosQuery = [];
    let skusQuery = [];
    let stylesObj = {product_id: req.query.id, results:[]};
    models.getStyles(req.query.id)
    .then(({ rows })=>{
      rows.forEach((row, index)=> {
        // console.log(row);
        stylesObj.results.push(row);
        photosQuery.push(models.getPhotos(row.style_id));
      });
      return Promise.all(photosQuery);
    })
    .then((response)=>{
      response.forEach((record, index)=>{
        stylesObj.results[index].photos = record.rows;
        // console.log(record.rows);
        skusQuery.push(models.getSkus(record.rows[0].styleid));
      });
      console.log('skusQuery is ', skusQuery);
      return Promise.all(skusQuery);
    })
    .then((response)=>{
      response.forEach((record, index)=>{
        stylesObj.results[index].skus = record.rows;
      })
      res.status(200).json(stylesObj)
    })
    .catch((err)=>{
      res.sendStatus(404);
    })
  },
}