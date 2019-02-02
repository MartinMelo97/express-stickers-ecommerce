const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
//lista
router.get('/', (req, res)=>{
    Product.find(
      {inStock: true}
      )
      .then(products=>{
        res.render('products/list', {products})
      })
      .catch(e=>res.render('error'))
})

router.get('/detail/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product=>res.render('products/detail', {product}))
    .catch(err=>res.render(err))
})

router.get('/new', (req, res) => {
  res.render('products/form')
})

router.post('/new', (req, res) => {
  Product.create(req.body)
    .then(product=> {
      res.redirect('/products/')
    })
    .catch(err=>res.render('error'))
})
//detalle

//formulario

module.exports = router