import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import { setLocals } from './middleware/auth.middleware.js' 
import commonRoutes from './routes/common.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }))
app.use(setLocals)
app.use(productRoutes)
app.use(authRoutes)
app.use(commonRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

