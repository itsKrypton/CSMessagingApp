const fs = require('fs');
const axios = require('axios');
const csv = require('csv-parser');

const csvFilePath = 'file-path';

const apiUrl = 'api-path';

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Make a POST request for each entry
    axios.get(apiUrl, {
      params: {
        userID: row.userID
      }
    })
      .then((response) => {
        console.log(`Successfully sent data: ${JSON.stringify(row)}`);
      })
      .catch((error) => {
        console.error(`Error sending data: ${JSON.stringify(row)}`);
        console.error(error);
      });
  })
  .on('end', () => {
    console.log('Finished sending all data');
  });