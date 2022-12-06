process.env.NODE_ENV = 'test'

import mongoose, {
    isValidObjectId
} from 'mongoose'
import request from 'supertest'

import { ObjectId } from "mongodb";

import app from '../../app.js'
import connectDB, {
    disconnectDB
} from '../../config/db.js'
import User from '../../models/User.js';


const config = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const existUser = {
    nom: "Smail",
    prenom: "Mustapha",
    email: "admin@example.com",
    password: "mustapha"
}

const newUser = {
    nom: "nom",
    prenom: "prenom",
    email: "email@email.com",
    password: "password"
}

beforeAll(() => {
    connectDB()
})

afterAll(async () => {
    await User.deleteOne({ nom: newUser.nom, email: newUser.email })
    disconnectDB()
})

describe('user API ', () => {

    describe('user login ', () => {

        it('POST api/users/login -> return a user with token', () => {
            return request(app)
                .post('/api/users/login')
                .send({ email: "test@test.com", password: "password" })
                .expect(200)
                .then(res => {
                    const { body } = res
                    const { _id } = body
                    expect(ObjectId.isValid(_id)).toBeTruthy()
                    expect(body).toEqual(
                        expect.objectContaining({
                            _id,
                            nom: expect.any(String),
                            prenom: expect.any(String),
                            email: expect.any(String),
                            isAdmin: expect.any(Boolean),
                            token: expect.any(String),
                        })
                    )
                })

        })

        it('POST api/users/login -> return a 401 error', () => {
            return request(app)
                .post('/api/users/login')
                .send({ email: "false@test.com", password: "password" })
                .expect(401)
                .then(res => {
                    const { body: { message } } = res
                    expect(message).toEqual('Invalid email or password')
                })

        })

    })

    describe('user register', () => {
        it('POST /api/users -> register a new user', () => {
            return request(app)
                .post('/api/users', config)
                .send(newUser)
                .expect(201)
                .then(res => {
                    const { body } = res
                    const { _id } = body
                    expect(ObjectId.isValid(_id)).toBeTruthy()
                    expect(body).toEqual(
                        expect.objectContaining({
                            _id,
                            nom: expect.any(String),
                            prenom: expect.any(String),
                            email: expect.any(String),
                            isAdmin: expect.any(Boolean),
                            token: expect.any(String),
                        })
                    )

                })
        })

        it('POST /api/users -> return an error user exists', () => {
            return request(app)
                .post('/api/users', config)
                .send(existUser)
                .expect(400)
                .then(res => {
                    const { body: { message } } = res
                    expect(message).toEqual('User already exists')
                })
        })
    })

    describe('user profile', () => {

        let token = "";
        beforeEach(async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send(existUser);
            token = response.body.token;
        });

        it('GET /api/users/profile -> return user data', () => {
            return request(app)
                .get('/api/users/profile')
                .set(config)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .then(res => {
                    const { body } = res
                    const { _id } = body
                    expect(ObjectId.isValid(_id)).toBeTruthy()
                    expect(body).toEqual(
                        expect.objectContaining({
                            _id,
                            nom: expect.any(String),
                            prenom: expect.any(String),
                            email: expect.any(String),
                            isAdmin: expect.any(Boolean),
                        })
                    )

                })
        })

        it('GET /api/users/profile -> return 401 unauthorized false token', () => {
            return request(app)
                .get('/api/users/profile')
                .set(config)
                .set('Authorization', `Bearer falseToken`)
                .expect(401)
                .then(res => {
                    const { body: { message } } = res
                    expect(message).toEqual('Not authorized, token failed')
                })
        })

        it('PUT /api/users/profile -> update password of user', () => {
            return request(app)
                .put('/api/users/profile')
                .set(config)
                .set('Authorization', `Bearer ${token}`)
                .send({ password: 'mustapha' })
                .expect(200)
                .then(res => {
                    const { body } = res
                    const { _id } = body
                    expect(ObjectId.isValid(_id)).toBeTruthy()
                    expect(body).toEqual(
                        expect.objectContaining({
                            _id,
                            nom: expect.any(String),
                            prenom: expect.any(String),
                            email: expect.any(String),
                            isAdmin: expect.any(Boolean),
                            token: expect.any(String),
                        })
                    )

                })
        })

    })

    it('PUT /api/users/profile -> 401 false token', () => {
        return request(app)
            .put('/api/users/profile')
            .set(config)
            .set('Authorization', `Bearer falseToken`)
            .expect(401)
            .then(res => {
                const { body: { message } } = res
                expect(message).toEqual('Not authorized, token failed')
            })
    })
})