import express from 'express'
import userRoutes from './routes/userRoutes'
import bookRoutes from './routes/bookRoutes'
import collectionRoutes from './routes/collectionRoutes'
import loginRoutes from './routes/loginRoutes'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello, World! :)')
})

app.use(express.json())
app.use(userRoutes)
app.use(bookRoutes)
app.use(collectionRoutes)
app.use(loginRoutes)

export default app