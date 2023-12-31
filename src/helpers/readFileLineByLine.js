const fs = require('fs');
const JSONStream = require('JSONStream');

const processJSONLFile = ()=>{
    const readStream = fs.createReadStream('../../large_products.jsonl', { encoding: 'utf8' });

    let lineCount = 0;

    readStream
        .pipe(JSONStream.parse())
        .on('data', (data) => {
            if (lineCount < 10000) {
                console.log(`Line ${lineCount}:`, data);
                lineCount++;
            } else {
                readStream.unpipe(JSONStream);
                readStream.destroy();
            }
        })
        .on('end', () => {
            console.log('File read complete');
        })
        .on('error', (err) => {
            console.error('Error reading file:', err);
        });
}

processJSONLFile()

module.exports = processJSONLFile;

// const fs = require('fs');
// const readline = require('readline');

// async function processFile() {
//     const readStream = fs.createReadStream('../../large_products.jsonl');
//     const rl = readline.createInterface({
//         input: readStream,
//         crlfDelay: Infinity,
//     });

//     let lineC = 0;

//     for await (const line of rl) {
//         console.log(`line ${lineC} ${line}`);
//         lineC++;
//         if (lineC >= 2) {
//             rl.close();
//             break;
//         }
//         // const data = JSON.parse(line);
//     }

//     console.log('File read complete');

// }

// processFile();