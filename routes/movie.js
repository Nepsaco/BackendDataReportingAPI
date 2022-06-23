const express = require('express')
const router = express.Router()
const movies = require('../queries/movies')

/**
 * @openapi
 * '/api/movies':
 *  get:
 *     summary: Get all movie data
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
 *              movies:
 *                type: object
 *                properties:
 *                  adult:
 *                      type: boolean
 *                  collection: 
 *                      type: object
 *                  budget:
 *                      type: number
 *                  homepage: 
 *                      type: string
 *                  id:
 *                      type: number
 *                  imdb_id:
 *                      type: string
 *                  original_language:
 *                      type: string
 *                  original_title:
 *                      type: string
 *                  overview:
 *                      type: string
 *                  popularity:
 *                      type: float
 *                  poster_path:
 *                      type: string
 *                  production_companies:
 *                      type: object
 *                  release_date:
 *                      type: date
 *                  revenue:
 *                      type: number
 *                  runtime:
 *                      type: float
 *                  status:
 *                      type: string
 *                  tagline:
 *                      type: string
 *                  title:
 *                      type: string
 *                  video:
 *                      type: boolean
 *                  vote_average:
 *                      type: float
 *                  vote_count:
 *                      type: number
 *                  genres: 
 *                      type: array
 *                  production_countries: 
 *                      type: array
 *                  spoken_languages: 
 *                      type: array
 *       400:
 *         description: Bad request
 */
router.get('/api/movies', (req, res) => {
    movies
        .getAll()
        .then(results => res.status(200).json(results))
})
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
 *                  adult:
 *                      type: boolean
 *                  collection: 
 *                      type: object
 *                  budget:
 *                      type: object
 *                  revenue:
 *                      type: object
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
 *                  adult:
 *                      type: boolean
 *                  collection: 
 *                      type: object
 *                  budget:
 *                      type: object
 *                  revenue:
 *                      type: object
 *       400:
 *         description: Bad request
 */
router.get('/api/movie_genres', (req, res) => {
    movies
        .genreDetails(req.query.year)
        .then(results => res.status(200).json(results))
})

module.exports = router
