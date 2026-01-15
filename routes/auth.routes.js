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
        console.log(user)
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

router.get('/login', async (req, res) => {
    if (req.session && req.session.user) {
        return res.redirect("/")
    } 
    res.render("auth/login")
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.render("auth/registration",{error: "enter all fields"}) 
    }
    try {
        const user = await User.findByEmail(email)
        if (!user) {
            return res.render("auth/login",{error: "Invalid email or password"}) 
        }
        const isValidPassword = await User.verifyPassword(password, user.password)
        if (!isValidPassword) {
            return res.render("auth/login",{error: "Invalid email or password"}) 
        }
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        res.redirect("/")
    }
    catch (err) {
        console.error(err)
        res.render("auth/login", { error: "something went wrong" })
    }
})


router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err)
        }
        res.redirect("/login")
    })
})



export default router