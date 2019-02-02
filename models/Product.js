const moongose = require('mongoose')
const Schema = moongose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price : {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['CHIDOS', 'MÁS CHIDOS', 'SÚPER CHIDOS']
  },
  img: {
    type: String,
    required: true
  },
  desc: String,
  inOffer: {
    type: Boolean,
    default: false
  },
  offerPrice: Number,
  inStock: {
    type: Boolean,
    default: true
  }
},{
  timestamps:true 
})

module.exports = moongose.model('Product', productSchema)