import express from 'express'

import * as User from '../models/user.model.js'

const router = express.Router()

router.get("/", async (req, res) => {
    res.render("index")
})

router.get("/home", async (req, res) => {
    res.render("home")
})

router.get("/favourite", async (req, res) => {
    res.render("favourite")
})

router.get("/basket", async (req, res) => {
    res.render("basket")
})

export default router