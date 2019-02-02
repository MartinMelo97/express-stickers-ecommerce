const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
//lista
router.get('/', (req, res)=>{
    Product.find(
      {inStock: true}
      )
      .then(products=>{
        res.render('products/list', {products, search:false})
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

router.post('/search', (req, res) => {
  console.log(req.body)
  Product.find({name: {$regex: req.body.search, $options: "i"}})
    .then((products)=>{
      console.log(products)
      res.render('products/list', {products, search: true})
    })
    .catch((err)=>console.log(err))
})

module.exports = router