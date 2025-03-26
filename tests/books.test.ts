import app from '../src/app'
import sequelize from '../src/config/database'
import request from 'supertest'


describe('Books Endpoint', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    test('POST /books shold create a new book and return success', async () => {
        const response = await request(app)
            .post('/books')
    })

    test('GET /books should return a list of books', () => {

        expect(false).toBeFalsy()
    })

})