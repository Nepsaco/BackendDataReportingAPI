const {parseCsv} = require('../parseCsv');
const path = require('path');
const homedir = require('os').homedir();
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  //Deletes ALL existing entries
  await knex('movie_production_companies').del()
  await knex('movie_genres').del()
  await knex('production_companies').del()
  await knex('movie_production_countries').del()
  await knex('production_countries').del()
  await knex('movie_languages').del()
  await knex('movies').del()
  await knex('collections').del()
  await knex('genres').del()

  const data = await parseCsv(path.resolve(__dirname, '../../test/fixtures/movies_metadata_test.csv'))
  const regex = /('(?=(,|:|})))|((?<=({|(:\s)|(,\s)|"))')/gm

  let moviesInsert = []
  let productionCompaniesInsert = []
  let productionIds = {}
  let movieProductionInsert = []
  let genresInsert = []
  let movieGenresInsert = []
  let genreIds = {}
  data.forEach(async ({
    production_companies,
    adult,
    budget,
    homepage,
    id,
    imdb_id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    revenue,
    genres,
  }) => {
    moviesInsert.push({
      adult: adult === 'False' ? false : true,
      budget: parseInt(budget, 10),
      homepage,
      id: parseInt(id, 10),
      imdb_id,
      original_language,
      original_title,
      overview,
      popularity: parseFloat(popularity),
      poster_path,
      release_date: new Date(release_date),
      revenue: parseInt(revenue, 10),
    })
    const productionCompanyArray = JSON.parse(production_companies.replace(/"/g, "'").replace(regex, '"'))
    productionCompanyArray.forEach(async (company) => {
      if (!productionIds[company.id]) {
        productionCompaniesInsert.push({name: company.name, id: company.id})
      }
      movieProductionInsert.push({movie_id: id, production_companies_id: company.id})
      productionIds[company.id] = true
    })
    const genresArray = JSON.parse(genres.replace(/"/g, "'").replace(regex, '"'))
    genresArray.forEach(async (genre) => {
      if (!genreIds[genre.id]) {
        genresInsert.push({id: genre.id, name: genre.name});
      }
      movieGenresInsert.push({movie_id: id, genre_id: genre.id})
      genreIds[genre.id] = true
    })
  });
  try {
    await knex('movies').insert(moviesInsert);
    await knex('production_companies').insert(productionCompaniesInsert);
    await knex('movie_production_companies').insert(movieProductionInsert);
    await knex('genres').insert(genresInsert);
    await knex('movie_genres').insert(movieGenresInsert);
  } catch (err) {
    console.log(err)
  }
}
