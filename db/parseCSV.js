// const csv = require('csv-parser')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const parseCsv = (filePath) => {
  console.log(fs.createReadStream(path.resolve(__dirname, 'the-movies-dataset/movies_metadata.csv')))
  const data = []
  fs.createReadStream(path.resolve(__dirname, 'the-movies-dataset/movies_metadata.csv'))
    .pipe(csv.parse({headers: true, delimiter: ','}))
    .on('error', error => console.error(error))
    .on('data', row => {
      console.log(row)
      data.push(row)
    })
    .on('end', () => console.log(data))
  // const stream = csv.parse({headers: true})
  //   .on('error', error => console.error(error))
  //   .on('data', row => {
  //     console.log(row)
  //     data.push(row)
  //   })
  //   .on('end', () => console.log(data))
  // stream.write('./the-movies-dataset/movies_metadata.csv')
  // stream.end('col1')
  return data
}

module.exports = parseCsv
