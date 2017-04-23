var http = require("http"),
    fs = require("fs"),
    url = require('url'),
    path = require("path"),
    home = path.dirname(require.main.filename),
    page;

http.createServer(function (request, response) {

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    
    page = request.url;
    console.log(page);

    if (page == "/search.txt") {

        fs.readFile('search.txt', null, function (err, data) {
            response.write(data);
            response.end();
        });

    } else {

        fs.readFile('index.html', null, function (err, data) {
            response.write(data);
            response.end();
        });

    }

    if (request.url) {

        var key = request.url.split("=")[1];
        //kPath = kPath=="C"?"C:/Users/cemaly/Desktop/":"x:/";

        if (key != undefined) {
            search(key, 'C:/');
        }
    }

}).listen(9999); // http://localhost:9999/







function search(key, path, dt) {

    if (dt == undefined) {

        fs.writeFile("search.txt", '');

    }

    var path;

    if (dt && path) path = path + "/" + dt;

    else if (!dt && !path) path = '';

    fs.readdir(path, (err, data) => {

        if (typeof (data) == "object") var len = data.length;

        for (var i = 0; i < len; i++) {

            if (data[i].indexOf(key) > -1) {

                fs.appendFile("search.txt", "a.push({name:'" + data[i] + "',path:'" + path + "/" + data[i] + "'});");

                var swt = true;

            }

            search(key, path, data[i]);

        }

    });

}

//search('wrn','/xampp/htdocs');
