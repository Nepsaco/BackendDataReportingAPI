const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')
describe('GET /api/movie_genres', () => {
    it('should return array of companies', (done) => {
        request(app)
            .get('/api/movie_genres')
            .expect(200)
            .end((err, response) => {
                expect(response.body).to.have.length(10)
                done()
            })
    });
});
describe('GET /api/movie_genres?year=1995', () => {
    it('returns 1 element', (done) => {
        request(app)
            .get('/api/movie_genres?year=1995')
            .expect(200)
            .end((err, response) => {
                expect(response.body).to.have.length(1)
                done()
            })
    })
    it('returns comedy with count of 5', (done) => {
        request(app)
            .get('/api/movie_genres?year=1995')
            .expect(200)
            .end((err, response) => {
                expect(response.body[0].name).to.equal('Comedy')
                expect(response.body[0].count).to.equal('5')
                done()
            })
    })
})
