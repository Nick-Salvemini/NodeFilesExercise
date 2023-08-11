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

function catWrite(path, filename) {



    let content = fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        let content = data;
        return content;
    })

    console.log(content)

    fs.writeFile(path, content, 'utf8', function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`no output, but ${path} contains contents of ${filename}`)
    })
}


if (process.argv[2] != '--out') {
    cat(process.argv[2])
    // console.log[process.argv[1]]
} else {

    // console.log('the argument is --out')
    catWrite(process.argv[3], process.argv[4])
}


