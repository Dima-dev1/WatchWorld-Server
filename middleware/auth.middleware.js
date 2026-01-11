export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next()
    } 
    req.redirect("/login")
}

export const setLocals = (req, res, next) => {
    res.locals.user = req.session.user || null
    next()
}

export const isSuperAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === "superadmin") {
        return next()
    }
    res.status(403).render("errors/forbidden",{message: "This is only for admins"})


}