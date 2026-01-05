import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret:'secret-key',resave:false, saveUninitialized:false}))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

