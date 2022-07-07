const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')
describe('GET /api/production_companies', () => {
    it('should return array of companies', (done) => {
        request(app)
            .get('/api/production_companies')
            .expect(200)
            .end((err, response) => {
                expect(response.body).to.have.length(21)
                done()
            })
    });
});
describe('GET /api/production_companies?production_id=3', () => {
    it('returns Pixar Animation Studios', (done) => {
        request(app)
            .get('/api/production_companies?production_id=3')
            .expect(200)
            .end((err, response) => {
                expect(response.body).to.have.length(1)
                expect(response.body[0].name).to.equal('Pixar Animation Studios')
                done()
            })
    })
    it('calculates total cumulative budget and revenue', (done) => {
        request(app)
            .get('/api/production_companies?production_id=3')
            .expect(200)
            .end((err, response) => {
                expect(response.body[0].budget_per_year).to.equal('60000001')
                expect(response.body[0].revenue_per_year).to.equal('873554034')
                done()
            })
    })
    it('calculates total cumulative budget and revenue by year', (done) => {
        request(app)
            .get('/api/production_companies?production_id=3&year=1995')
            .expect(200)
            .end((err, response) => {
                expect(response.body[0].budget_per_year).to.equal('30000000')
                expect(response.body[0].revenue_per_year).to.equal('373554033')
                done()
            })
    })
})
