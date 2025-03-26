import { Sequelize } from 'sequelize'

const isTest = process.env.NODE_ENV === 'test'

const sequelize = new Sequelize(
    isTest ? 'biblioteca_test' : 'biblioteca',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: !isTest
    }
)

export default sequelize