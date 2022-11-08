const models = require('./models.js');

module.exports = {
  getProduct: function (req, res) {
    models.getProductInfo(req.query.id)
      .then((response)=>{
        res.status(200).json(response.rows)
      })
      .catch((err)=>{
        res.sendStatus(404);
      })
  },

/*   getStyles: function (req, res) {
    let photosQuery = [];
    let skusQuery = [];
    let styleidArray = [];
    let stylesObj = {product_id: req.query.id, results:[]};
    models.getStyles(req.query.id)
    .then(({ rows })=>{
      rows.forEach((row, index)=> {
        stylesObj.results.push(row);
        styleidArray.push(row.style_id)
        skusQuery.push(models.getSkus(row.style_id));
      });
      return Promise.all(skusQuery);
    })
    .then((response)=>{
      response.forEach((record, index)=>{
        stylesObj.results[index].skus = record.rows;
        photosQuery.push(models.getPhotos(styleidArray[0]));
      });
      return Promise.all(photosQuery);
    })
    .then((response)=>{
      console.log(response);
      response.forEach((record, index)=>{
        stylesObj.results[index].photos = record.rows;
      })
      res.status(200).json(stylesObj)
    })
    .catch((err)=>{
      res.sendStatus(404);
    })
  }, */
  getStyles: function (req, res) {
    models.getStyles(req.query.id)
      .then((response)=>{
        res.status(200).json(response.rows[0].row_to_json)
      })
  },


  getRelated: function (req, res) {
    models.getRelated(req.query.id)
      .then(({ rows })=>{
        res.status(200).json(rows[0].array_agg)
      })
      .catch((err)=>{
        res.sendStatus(404);
      })
  }
}