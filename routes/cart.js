const router = require('express').Router()
const Product = require('../models/Product')

router.get('/', (req, res)=>{
  const { cart } = req.app.locals
  Product.find({_id:{$in: Object.keys(cart)}})
    .then((products)=>{
      console.log(products)
      let total = 0
      products = products.map(p=>{
        total+=p.price * cart[p._id]
        let product = {
          product:p, 
          quantity: cart[p._id],
          subtotal: p.price * cart[p._id]
        }
        return product
      })
      res.render('products/cart', {products, total})
    })
    .catch((err)=>{
      console.log(err)
      res.render('error')
    })
})

router.post('/add', (req, res)=>{
   const {cart} = req.app.locals
   const {productId} = req.body
   cart[productId] ? cart[productId]++ : cart[productId] = 1
   res.redirect('back')
})


//restar

//mostrar el carrito

module.exports = router