// const parseCsv = require('../parseCsv');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // parseCsv('./the-movies-dataset/movies_metadata.csv')
  // console.log(parseCsv('the-movies-dataset/movies_metadata.csv'))
  // Deletes ALL existing entries
  await knex('production_companies').del()
  await knex('production_companies').insert([
    {name: 'Pixar Animation Studios', id: 3}
  ]);

  await knex('collections').del()
  await knex('collections').insert([
    {
      id: 10194, name: 'Toy Story Collection', poster_path: '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', backdrop_path: '/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg'
    },
  ]);

  await knex('movies').del()
  await knex('movies').insert([
    {
      adult: false,
      collection_id: 10194,
      budget: 30000000,
      homepage: 'http://toystory.disney.com/toy-story',
      id: 862,
      imdb_id: 'tt0114709',
      original_language: 'en',
      original_title: 'Toy Story',
      overview: "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
      popularity: 21.946943,
      poster_path: '/rhIRbceoE9lR4veEXuwCC2wARtG.jpg',
      production_companies_id: 3,
      release_date: '1995-10-30',
      revenue: 373554033,
      runtime: 81.0,
      status: 'Released',
      tagline: '',
      title: 'Toy Story',
      video: false,
      vote_average: 7.7,
      vote_count: 5415,
    }
  ]);

  await knex('genres').del()
  await knex('genres').insert([
    {id: 16, name: 'Animation'}, {id: 35, name: 'Comedy'}, {id: 10751, name: 'Family'},
  ]);

  await knex('production_countries').del()
  await knex('production_countries').insert([
    {id: 1, iso_3166_1: 'US', name: 'United States of America'}
  ]);

  await knex('spoken_languages').del()
  await knex('spoken_languages').insert([
    {id: 1, iso_639_1: 'en', name: 'English'},
  ]);

  await knex('movie_genres').del()
  await knex('movie_genres').insert([
    {id: 1, movie_id: 862, genre_id: 16},
    {id: 2, movie_id: 862, genre_id: 35},
    {id: 3, movie_id: 862, genre_id: 10751},
  ]);

  await knex('movie_production_countries').del()
  await knex('movie_production_countries').insert([
    {id: 1, movie_id: 862, production_countries_id: 1},
  ]);

  await knex('movie_languages').del()
  await knex('movie_languages').insert([
    {id: 1, movie_id: 862, spoken_languages_id: 1},
  ]);
};
