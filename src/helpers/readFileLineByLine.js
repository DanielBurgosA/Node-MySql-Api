const fs = require('fs');
const JSONStream = require('JSONStream');

const processJSONLFile = () => {
    const dataArray = [];
    const max1 = 1000;
    const max2 = 900;
    const readStream = fs.createReadStream('../../large_products.jsonl', { encoding: 'utf8', highWaterMark: 320 * 1024 });

    readStream
    .pipe(JSONStream.parse())
    .on('data', (data) => {
        if(dataArray.length<max1){
            if (dataArray.length<max2) {
                dataArray.push(data);
            }
            else {
                readStream.pause();
                console.log('Final : '+ dataArray.length)
            }
        }
    })
    .on('end', () => {console.log('File read complete');})
    .on('error', (err) => {console.error('Error reading file:', err);});
};

processJSONLFile()


module.exports = processJSONLFile;