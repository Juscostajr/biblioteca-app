import app from '../src/app'
import sequelize from '../src/config/database'
import request from 'supertest'
import { authMiddleware } from '../src/middleware/authMiddleware'

jest.mock('../src/middleware/authMiddleware', () => {
    return {
        authMiddleware: (req: any, res: any, next: any) => {
            req.body.user = {
                email: 'qualquer',
                password: '1234'
            }

            next()
        }
    }
})


describe('User Endpoint', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    test('POST /users shold create a new user and return success', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'Cuca',
                email: 'beludo@onlyfans.com',
                password: '12345'
            })
        expect(response.status).toBe(201)
    })

    test('GET /users should return a list of books', async () => {
        const response = await request(app)
            .get('/users')
            .set({Authorization: 'xablau'})

        expect(response.status).toBe(200)
    })

})