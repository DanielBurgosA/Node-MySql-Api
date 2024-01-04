const fs = require('fs');
const JSONStream = require('JSONStream');
const migrateProducts = require('./migrateProducts');

const processJSONLFile = () => {
    return new Promise((resolve, reject) => {
        let countLine = 1;
        let dataArray = [];
        // const streamSize = 20000;
        const bufferSize = 900;
        const readStream = fs.createReadStream('./file/large_products.jsonl', { encoding: 'utf8', highWaterMark: 3 * 1024 });

        readStream
            .on('error', (err) => {
                reject(new Error('Error reading file:' + err));
            })
            .pipe(JSONStream.parse())
            .on('data', async (data) => {
                dataArray.push(data);
                if (dataArray.length === bufferSize) {
                        const send = [...dataArray];
                        dataArray.length = 0;
                        await migrateProducts(send);
                    }
                if(typeof streamSize !== 'undefined' && streamSize !== null && countLine===streamSize){
                    readStream.pause();
                    readStream.close();
                    if (dataArray.length > 0) {
                        const send = [...dataArray];
                        dataArray.length = 0;
                        await migrateProducts(send);
                    }
                    resolve('data imported');
                } 
                countLine++;
            })
            .on('end', async () => {
                if (dataArray.length > 0) {
                    await migrateProducts(dataArray);
                }
                console.log('File read complete');
                resolve('data imported');
            });
    });
};

module.exports = processJSONLFile;