const fs = require('fs');
const readline = require('readline');

async function processFile() {
    const readStream = fs.createReadStream('../../large_products.jsonl');
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
    });

    let lineC = 0;

    for await (const line of rl) {
        console.log(`line ${lineC} ${line}`);
        lineC++;
        if (lineC >= 2) {
            rl.close();
            break;
        }
        // const data = JSON.parse(line);
    }

    console.log('File read complete');

}

processFile();