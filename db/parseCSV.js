const fs = require('fs');
const csv = require('fast-csv');

const parseCsv = (filePath) => {
  let data = []
  const promise = new Promise((resolve) => {
    fs.createReadStream(filePath)
      .on('error', error => console.log(error))
      .pipe(csv.parse({headers: true}))
      .on('data', row => {
        data.push(row)
      })
      .on('error', error => console.error(error))
      .on('end', () => {
        resolve(data)
      })
  })
  return Promise.all([promise]).then(() => {
    return data
  })
}

module.exports = parseCsv
