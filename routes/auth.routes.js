import express from 'express'

import * as User from '../models/user.model.js'

const router = express.Router()


router.get('/registration', async (req, res) => {
    if (req.session && req.session.user) {
        return res.redirect("/")
    } 
    res.render("auth/registration")
})

router.post('/registration', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.render("auth/registration",{error: "enter all fields"}) 
    }
    try { 
        const existingUser = await User.findByEmail(email)
        if (existingUser) {
            return res.render("auth/registration",{error: "This user has an account"}) 
        }
        const userId = await User.create({ email, password })
        const user = await User.findByID(userId)
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        res.redirect("/")
    } catch (err) {
        console.error(err)
        res.render("auth/registration", { error: "something went wrong" })
    }
})








export default router