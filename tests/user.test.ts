import app from '../src/app'
import sequelize from '../src/config/database'
import request from 'supertest'
import { authMiddleware } from '../src/middleware/authMiddleware'
import { validatePasswordMinimunLength } from '../src/validations/userValidations'




describe('User Endpoint', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
        const response = await request(app)
        .post('/users')
        .send({
            name: 'Cuca',
            email: 'beludo@onlyfans.com',
            password: '123456789'
        })
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
                password: '123456789'
            })
        expect(response.status).toBe(201)
    })

    test('POST /users with weak password shold return 400', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'Cuca',
                email: 'beludo@onlyfans.com',
                password: '123'
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error','Password must have a least 8 characters.')
    })

    test('GET /users should return a list of users', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'beludo@onlyfans.com',
                password: '123456789'
            })
        
        expect(token.status).toBe(200)

        const response = await request(app)
            .get('/users')
            .set({Authorization: token.body.token})
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body[0]).toHaveProperty('name','Cuca')
    })

    test('GET /users without token should return FORBIDEN', async () => {
        const response = await request(app)
            .get('/users')
        expect(response.status).toBe(401)
    })

})

describe('User validations', () => {
    test('Passord must have a least 8 characters.', () => {
        const password = 'Jararaca123'
        const password2 = '123'
        expect(validatePasswordMinimunLength(password)).toBeTruthy()
        expect(validatePasswordMinimunLength(password2)).toBeFalsy()
    })
})