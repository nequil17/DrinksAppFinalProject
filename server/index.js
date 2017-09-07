var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var app = express();
var clientPath = path.join(__dirname, '..', 'client');
var jsonPath = path.join(__dirname, 'data.json');
app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.route('/api/achievements')
    .get(function (req, res) {
        res.sendFile(jsonPath);
    })
    .post(function (req, res) {
        fs.readFile(jsonPath, 'utf-8', function (err, fileContents) {
            if (err) {
                res.status(500);
            } else {
                var achievements = JSON.parse(fileContents),
                    achevie = req.body;
                // achevie.id = shortid.generate();
                achievements.push(achevie);
                fs.writeFile(jsonPath, JSON.stringify(achievements), function (err, success) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.status(201);
                        res.send(achevie);
                    }
                });
            }
        });
    });

app.listen(3000, function () {
    console.log('Listening on port 3000');
})