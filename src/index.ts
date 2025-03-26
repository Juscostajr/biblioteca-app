import sequelize from './config/database'
import app from './app'

const port = 3000

// sync database
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('database foi sincronizado com sucesso')
    })
    .catch((error) => {
        console.log('deu zica no bagulho', error)
    })

app.listen(port, () => {
    console.log('Server is running on port ', port)
})