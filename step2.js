const fs = require('fs');
const process = require('process')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            webCat(path)
        } else {
            console.log('Data:', data)
        }
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data)
    } catch (err) {
        console.log(`Error.  Could Not Find ${url}: ${err}`);
        process.exit(1);
    }

}

cat(process.argv[2])