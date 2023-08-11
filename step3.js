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
        if (process.argv[2] != '--out') {
            console.log(resp.data);
        } else { return (resp.data) }
    } catch (err) {
        console.log(`Error.  Could Not Find ${url}: ${err}`);
        process.exit(1);
    }
}

function write(path, content, filename) {
    fs.writeFile(path, content, 'utf8', function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            console.log(`no output, but ${path} contains contents of ${filename}`)
        }
    })
}

function catWrite(path, filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            webCat(filename).then(data => {
                write(path, data, filename)
            })
        }
        else {
            write(path, data, filename);
        }
    })
}

if (process.argv[2] != '--out') {
    cat(process.argv[2])
} else {
    catWrite(process.argv[3], process.argv[4])
}


