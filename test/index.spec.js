const chai = require('chai')
const request = require('supertest')
const app = require('../app')

describe('text suite smoke test', () => {
    it('should return true', () => {
        chai.expect(true).to.be.true
    });
});
describe('API smoke test', () => {
    it('should respond with welcome text', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .then((response) => {
                chai.expect(response.text).to.equal('Welcome to the Data Reporting project!')
                done()
            })
            .catch(err => done(err))
    });
});
