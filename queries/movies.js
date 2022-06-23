const database = require('../db/database')

module.exports = {
    getAll: () => {
        return database('movies')
            .then((movies) => {
                const collections = movies.map(movie => {
                    return database('collections')
                        .where('collections.id', movie.collection_id)
                        .then(collections => {
                            movie.collection = collections
                            delete movie.collection_id
                            return movie
                        })
                })
                return Promise.all(collections)
            })
            .then(movies => {
                const production_companies = movies.map(movie => {
                    return database('production_companies')
                        .where('production_companies.id', movie.production_companies_id)
                        .then(production_companies => {
                            movie.production_companies = production_companies
                            delete movie.production_companies_id
                            return movie
                        })
                })
                return Promise.all(production_companies)

            })
            .then(movies => {
                const movie_genres = movies.map(movie => {
                    return database('movie_genres')
                        .where('movie_genres.movie_id', movie.id)
                        .join('genres', 'movie_genres.genre_id', '=', 'genres.id')
                        .then(genres => {
                            movie.genres = genres
                            return movie
                        })
                })
                return Promise.all(movie_genres)
            })
    },
    productionCompanyDetails: (production_id, year) => {
        return database('production_companies')
            .modify(query => {
                if (production_id) {
                    query.where('production_companies.id', production_id)
                }
            })
            .then((companies) => {
                const updatedCompanies = companies.map((company) => {
                    return database('movies')
                        .where('movies.production_companies_id', company.id)
                        .then(movies => {
                            const budgetPerYear = {}
                            const revenuePerYear = {}
                            movies.forEach((movie) => {
                                const releaseDate = new Date(movie.release_date).getFullYear()
                                if (year) {
                                    if (year == releaseDate) {
                                        if (budgetPerYear[releaseDate]) {
                                            budgetPerYear[releaseDate] += movie.budget
                                        } else {
                                            budgetPerYear[releaseDate] = movie.budget
                                        }
                                        if (revenuePerYear[releaseDate]) {
                                            revenuePerYear[releaseDate] += movie.revenue
                                        } else {
                                            revenuePerYear[releaseDate] = movie.revenue
                                        }
                                    }
                                } else {
                                    if (budgetPerYear[releaseDate]) {
                                        budgetPerYear[releaseDate] += movie.budget
                                    } else {
                                        budgetPerYear[releaseDate] = movie.budget
                                    }
                                    if (revenuePerYear[releaseDate]) {
                                        revenuePerYear[releaseDate] += movie.revenue
                                    } else {
                                        revenuePerYear[releaseDate] = movie.revenue
                                    }
                                }
                            })
                            company.budget_per_year = budgetPerYear
                            company.revenue_per_year = revenuePerYear
                            return company
                        })
                })
                return Promise.all(updatedCompanies)
            })
    },
    genreDetails: (year) => {
        if (year) {
            return database('movies')
                .where(database.raw(`DATE_PART('year', release_date) = ${year}`))
                .then((movies) => {
                    const movie_genres = movies.map(movie => {
                        return database('movie_genres')
                            .where('movie_genres.movie_id', movie.id)
                            .join('genres', 'movie_genres.genre_id', '=', 'genres.id')
                            .then(genres => {
                                movie.genres = genres
                                return movie
                            })
                    })
                    return Promise.all(movie_genres)
                })
                .then(movies => {
                    const releaseDates = {}
                    movies.forEach(movie => {
                        const releaseDate = new Date(movie.release_date).getFullYear()
                        if (releaseDate[releaseDate]) {
                            releaseDates[releaseDate] = [releaseDates[releaseDate], ...movie.genres]
                        } else {
                            releaseDates[releaseDate] = [...movie.genres]
                        }
                    })

                    return releaseDates[year]
                        .map((genre) => {
                            if (!genre.hasOwnProperty('count')) {
                                genre.count = 0
                            }
                            genre.count += 1
                            return genre
                        })
                        .reduce((accumulator, genre) => {
                            if (accumulator.length == 0) {
                                accumulator = [genre]
                            } else if (genre.count === accumulator[0].count) {
                                accumulator.push(genre)
                            } else if (genre.count > accumulator[0].count) {
                                accumulator = [genre]
                            }
                            return accumulator
                        }, [])
                })
        } else {
            return database('genres')
        }
    }
}
