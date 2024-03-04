const express = require('express')
const prodRouter = express.Router()

const prodController = require('../controller/prodController')

// prodRouter.post('/store-products', prodController.storeProducts);
// prodRouter.get('/list-products', prodController.getProducts);

prodRouter
  .post('/store-products', prodController.storeProducts)
  .get('/list-products', prodController.listProducts);


exports.routes = prodRouter;