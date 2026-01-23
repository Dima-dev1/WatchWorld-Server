import express from 'express'

import * as Product from '../models/product.model.js'

const router = express.Router()

router.get('/products/:id', async (req, res) => {
  const product = await Product.getById(req.params.id)
  res.render('products/detail', { product })
})

router.get('/products', async (req, res) => {
  const {search,minPrice,maxPrice,page} = req.query
  const result = await Product.getFiltered({
    search: search || "",
    minPrice: minPrice ? parseFloat(minPrice) : null,
    maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    page: page ? parseInt(page) : 1,
    limit: 8
  })
  res.render('products/list', {
    products: result.products,
    total: result.total,
    page: result.page,
    search: result.search,
    minPrice: result.minPrice,
    maxPrice: result.maxPrice,
    totalPages: result.totalPages
  })
})

export default router