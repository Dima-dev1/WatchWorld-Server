import express from 'express'

import * as User from '../models/user.model.js'

const router = express.Router()

router.get("/", async (req, res) => {
    res.render("index")
})

router.get("/home", async (req, res) => {
    res.render("home")
})

export default router