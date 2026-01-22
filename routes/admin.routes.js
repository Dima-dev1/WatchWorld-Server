import express from 'express'
import * as Product from '../models/product.model.js'
import upload from '../config/multer.js'
import { isSuperAdmin } from '../middleware/auth.middleware.js'

const router = express.Router()

// Only accessible by super admins
router.use(isSuperAdmin)

// Dashboard - list all products
router.get('/admin', async (req, res) => {
  try {
    const products = await Product.getAll()
    res.render('admin/dashboard', { products })
  } catch (err) {
    console.error(err)
    res.render('admin/dashboard', { products: [], error: 'Failed to load products' })
  }
})

// Create product form
router.get('/admin/products/create', async (req, res) => {
  res.render('admin/product-form', { product: null, error: null })
})

// Edit product form
router.get('/admin/products/:id/edit', async (req, res) => {
  try {
    const product = await Product.getById(req.params.id)
      if (!product) return res.redirect('/admin')
      console.log(product)
    res.render('admin/product-form', { product, error: null })
  } catch (err) {
    console.error(err)
    res.redirect('/admin')
  }
})

// Create product - handle POST
router.post(
  '/admin/products/create',
  upload.single('image'),
  async (req, res) => {
    const { title, description, characteristics, price } = req.body
    let image = null
    if (req.file) image = '/uploads/products/' + req.file.filename

    try {
      await Product.create({ title, description, characteristics, price, image })
      res.redirect('/admin')
    } catch (err) {
      console.error(err)
      // Pass product=null so template works correctly
      res.render('admin/product-form', {
        product: null,
        error: 'Something went wrong while creating the product',
      })
    }
  }
)

// Edit product - handle POST
router.post(
  '/admin/products/:id/edit',
  upload.single('image'),
  async (req, res) => {
    const { title, description, characteristics, price } = req.body
    try {
      const existingProduct = await Product.getById(req.params.id)
      if (!existingProduct) return res.redirect('/admin')

      let image = existingProduct.image
      if (req.file) image = '/uploads/products/' + req.file.filename

      await Product.update(req.params.id, {
        title,
        description,
        characteristics,
        price,
        image,
      })

      res.redirect('/admin')
    } catch (err) {
      console.error(err)
      // Pass the existing product so the form still pre-fills values
      const existingProduct = await Product.getById(req.params.id)
      res.render('admin/product-form', {
        product: existingProduct || null,
        error: 'Something went wrong while updating the product',
      })
    }
  }
)

// Delete product
router.post('/admin/products/:id/delete', async (req, res) => {
  try {
    await Product.remove(req.params.id)
    res.redirect('/admin')
  } catch (err) {
    console.error(err)
    // Pass product=null to prevent ReferenceError
    res.render('admin/product-form', {
      product: null,
      error: 'Something went wrong while deleting the product',
    })
  }
})

export default router
