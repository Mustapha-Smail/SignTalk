process.env.NODE_ENV = 'test'

import {
    isValidObjectId
} from 'mongoose'
import request from 'supertest'

import app from '../../app.js'
import connectDB, {
    disconnectDB
} from '../../config/db.js'

beforeAll(() => {
    connectDB()
})

afterAll(() => {
    disconnectDB()
})

describe('History API', () => {

    it('GET /api/history/all --> return array of users score by game type', () => {
        return request(app)
            .post('/api/history/all')
            .send({ gameType: "quizzLSF" })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {
                    body
                } = res
                expect(body.length).toBeGreaterThan(0)
                expect(body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            nom: expect.any(String),
                            prenom: expect.any(String),
                            score: expect.any(Number)
                        })
                    ])
                )
            })
    })
})