const express = require('express')
const router = express.Router()
const movies = require('../queries/movies')

/**
 * @openapi
 * '/api/production_companies':
 *  get:
 *     summary: Get all production company data
 *     parameters: 
 *     - name: production_id
 *       in: query
 *       required: false
 *     - name: year
 *       in: query
 *       required: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              production_companies:
 *                type: object
 *                properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  budget_per_year:
 *                      type: integer
 *                  revenue_per_year:
 *                      type: integer
 *       400:
 *         description: Bad request
 */
router.get('/api/production_companies', (req, res) => {
    movies
        .productionCompanyDetails(req.query.production_id, req.query.year)
        .then(results => res.status(200).json(results))
})
/**
 * @openapi
 * '/api/movie_genres':
 *  get:
 *     summary: Get all movie genre details
 *     parameters: 
 *     - name: year
 *       in: query
 *       required: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              genres:
 *                type: object
 *                properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  count: 
 *                      type: integer
 *       400:
 *         description: Bad request
 */
router.get('/api/movie_genres', (req, res) => {
    movies
        .genreDetails(req.query.year)
        .then(results => res.status(200).json(results))
})

module.exports = router
