const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'UTF-8');
const laptopData = JSON.parse(json);

console.log(laptopData);

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end('This is the products page');
    }
    
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'UTF-8', (err, data) => {
            let output = data.replace(/{%PRODUCTNAME%}/g, laptopData[id].productName);
            output = output.replace(/{%IMAGE%}/g, laptopData[id].image);
            output = output.replace(/{%PRICE%}/g, laptopData[id].price);
            output = output.replace(/{%SCREEN%}/g, laptopData[id].screen);
            output = output.replace(/{%CPU%}/g, laptopData[id].cpu);
            output = output.replace(/{%STORAGE%}/g, laptopData[id].storage);
            output = output.replace(/{%RAM%}/g, laptopData[id].ram);
            output = output.replace(/{%DESCRIPTION%}/g, laptopData[id].description);
            res.end(output);
        })
    }

    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end("URL wasn't found on the server");
    }
    
    
});

server.listen(1337, '127.0.0.1', () => {
    console.log('server started listening for requests now');
    
});
