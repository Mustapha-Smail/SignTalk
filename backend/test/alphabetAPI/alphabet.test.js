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

describe('Alphabet API', () => {

    it('GET /api/alphabet --> return array of alphabets',  () => {
        return request(app)
            .get('/api/alphabet')
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
                            name: expect.any(String),
                            lsf: expect.objectContaining({
                                type: expect.any(String),
                                url: expect.any(String),
                            })
                        })
                    ])
                )
            })
    })

    it('GET /api/alphabet/id --> return a alphabet by Id',  () => {
        return request(app)
            .get('/api/alphabet/6385ec35a97a15c127306280')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {
                    body
                } = res

                expect(body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        lsf: expect.objectContaining({
                            type: expect.any(String),
                            url: expect.any(String),
                        })
                    })
                )
            })
    })

    it('GET /api/alphabet/id --> 404 if not found',  () => {
        return request(app)
            .get('/api/alphabet/63370b1cdaac278e4208db24')
            .expect('Content-Type', /json/)
            .expect(404)
    })

    it('GET /api/alphabet/id --> 500 if id incorrect',  () => {
        return request(app)
            .get('/api/alphabet/incorrectId')
            .expect('Content-Type', /json/)
            .expect(500)
    })

})