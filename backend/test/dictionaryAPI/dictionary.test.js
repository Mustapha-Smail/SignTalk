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

describe('Dictionary API', () => {

    it('GET /api/dictionary --> return array of dictionaries',  () => {
        return request(app)
            .get('/api/dictionary')
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

    it('GET /api/dictionary/random --> return a mongodb object ID',  () => {
        return request(app)
            .get('/api/dictionary/random')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {
                    body
                } = res

                expect(isValidObjectId(body));
            })
    })

    it('GET /api/dictionary/id --> return a Dictionary by Id',  () => {
        return request(app)
            .get('/api/dictionary/63370b1cdaac278e4208db60')
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

    it('GET /api/dictionary/id --> 404 if not found',  () => {
        return request(app)
            .get('/api/dictionary/63370b1cdaac278e4208db24')
            .expect('Content-Type', /json/)
            .expect(404)
    })

    it('GET /api/dictionary/id --> 500 if id incorrect',  () => {
        return request(app)
            .get('/api/dictionary/incorrectId')
            .expect('Content-Type', /json/)
            .expect(500)
    })

    it('GET /api/dictionary/quizz/lsf --> return a quizz obj with 1 image and 4 words ', () => {
        return request(app)
            .get('/api/dictionary/quizz/lsf')
            .expect('Content-Type', /json/)
            .expect(200)
            .then( res => {
                const { body } = res

                expect(body).toEqual(
                    expect.objectContaining({
                        multimedia: expect.objectContaining({
                            type: expect.any(String),
                            url: expect.any(String),
                        }),
                        words: expect.arrayContaining([
                            expect.any(String)
                        ])
                        ,
                        correctWord: expect.any(String),
                    })
                )
            })
    });

    it('GET /api/dictionary/quizz/fr --> return a quizz obj with 1 word and 4 images ', () => {
        return request(app)
            .get('/api/dictionary/quizz/fr')
            .expect('Content-Type', /json/)
            .expect(200)
            .then( res => {
                const { body } = res

                expect(body).toEqual(
                    expect.objectContaining({
                        word: expect.any(String),
                        multimedias: expect.arrayContaining([
                            expect.objectContaining({
                                type: expect.any(String),
                                url: expect.any(String),
                            })
                        ]),
                        correctMultimedia: expect.objectContaining({
                            type: expect.any(String),
                            url: expect.any(String),
                        })
                    })
                )
            })
    });

})