import express from 'express'

import * as Product from '../models/product.model.js'

import upload from '../config/multer.js'

import {isSuperAdmin} from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(isSuperAdmin)

router.get('/admin', async (req, res) => {
  const products = await Product.getAll()
  res.render('admin/dashboard', { products })
})

router.get('/admin/products/create', async (req, res) => {
    res.render('admin/product-form',{product: null})
})

router.get('/admin/products/:id/edit', async (req, res) => {
    const product = await Product.getById(req.params.id)

    if (!product) {
        return res.redirect('/admin')
    }

    res.render('admin/product-form', { product })
})

// Same thing

// router.get('/admin/products/:id/edit', async (req, res) => {
//     const product = await Product.getById(req.params.id)

//     if (product) {
//         res.render('admin/product-form', { product })
//     } else {
//         return res.redirect('/admin')
//     }
// })


router.post('/admin/products/create',upload.single('image') ,async (req, res) => {
    const { title, description, characteristics, price, } = req.body
    let image = null
    if (req.file) {
        image = '/uploads/products/' + req.file.filename
    }
    
    try {
        await Product.create({ title, description, characteristics, price, image })
        res.redirect('/admin')
    }

    catch (err) {
        console.error(err)
        res.render("admin/product-form", { error: "something went wrong" })
    }
})

router.post('/admin/products/:id/edit',upload.single('image'),async (req, res) => {
    const { title, description, characteristics, price } = req.body
    const existingProduct = await Product.getById(req.params.id)
    let image = existingProduct.image
    if (req.file) {
        image = '/uploads/products/' + req.file.filename
    }
    
    try {
        await Product.update(req.params.id,{ title, description, characteristics, price, image })
        res.redirect('/admin')
    }

    catch (err) {
        console.error(err)
        res.render("admin/product-form", { error: "something went wrong" })
    }
})

router.post('/admin/products/:id/delete', async (req, res) => {
    try {
        await Product.remove(req.params.id)
       
    }

    catch (err) {
        console.error(err)
        res.render("admin/product-form", { error: "something went wrong" })
    }
})

export default router