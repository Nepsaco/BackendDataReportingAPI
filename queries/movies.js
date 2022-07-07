const database = require('../db/database')

module.exports = {
    productionCompanyDetails: (production_id, year) => {
        if (!!production_id || !!year) {
            if (!!production_id && !!year) {
                return database.raw("SELECT pc.id, pc.name, SUM(m.budget) AS budget_per_year, SUM(m.revenue) AS revenue_per_year \
                    FROM production_companies pc \
                    INNER JOIN movie_production_companies mpc ON mpc.production_companies_id = pc.id \
                    INNER JOIN movies m ON m.id = mpc.movie_id \
                    WHERE pc.id = ? AND DATE_PART('year', m.release_date) = ? \
                    GROUP BY pc.id;", [production_id, year])
                    .then((res) => {
                        return res.rows
                    })

            }
            if (!!production_id) {
                return database.raw("SELECT pc.id, pc.name, SUM(m.budget) AS budget_per_year, SUM(m.revenue) AS revenue_per_year \
                    FROM production_companies pc \
                    INNER JOIN movie_production_companies mpc ON mpc.production_companies_id = pc.id \
                    INNER JOIN movies m ON m.id = mpc.movie_id \
                    WHERE pc.id = ? \
                    GROUP BY pc.id;", production_id)
                    .then((res) => {
                        return res.rows
                    })

            }
            if (!!year) {
                return database.raw("SELECT pc.id, pc.name, SUM(m.budget) AS budget_per_year, SUM(m.revenue) AS revenue_per_year \
                    FROM production_companies pc \
                    INNER JOIN movie_production_companies mpc ON mpc.production_companies_id = pc.id \
                    INNER JOIN movies m ON m.id = mpc.movie_id \
                    WHERE DATE_PART('year', m.release_date) = ? \
                    GROUP BY pc.id;", production_id)
                    .then((res) => {
                        return res.rows
                    })

            }
        }

        return database.raw("SELECT pc.id, pc.name, SUM(m.budget) AS budget_per_year, SUM(m.revenue) AS revenue_per_year \
            FROM production_companies pc \
            INNER JOIN movie_production_companies mpc ON mpc.production_companies_id = pc.id \
            INNER JOIN movies m ON m.id = mpc.movie_id \
            GROUP BY pc.id")
            .then((res) => {
                return res.rows
            })
    },
    genreDetails: (year) => {
        if (year) {
            return database.raw("SELECT g.id, g.name, COUNT(*) \
                FROM genres g \
                INNER JOIN(\
                    SELECT mg.genre_id FROM movies m \
                    INNER JOIN movie_genres mg ON mg.movie_id = m.id \
                    WHERE DATE_PART('year', m.release_date) = 1995) AS x \
                ON g.id = x.genre_id \
                GROUP BY g.id, x.genre_id \
                ORDER BY count DESC LIMIT 1")
                .then((res) => {
                    return res.rows
                })
        } else {
            return database.raw('SELECT * FROM genres;')
                .then((res) => {
                    return res.rows
                })
        }
    }
}
