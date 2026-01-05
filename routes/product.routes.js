import express from 'express'

import * as Product from '../models/product.model.js'

const router = express.Router()

router.get('/products/:id', async (req, res) => {
  const product = await Product.getById(req.params.id)
  res.render('products/detail', { product })
})

router.get('/products', async (req, res) => {
  const products = await Product.getAll()
  res.render('products/list', { products })
})

export default router