const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const jsonContent = require('../data/positions.json');
let jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.status(200).json(jsonContent);
});

router.post('/', jsonParser, (req, res) => {
    let objContent;
    const newPosition= {
        id: req.body.id,
        position: req.body.position,
        function: req.body.function,
        reportsTo: req.body.reportsTo
    };

    fs.readFile('./data/positions.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            objContent = JSON.parse(data);

            objContent.push(newPosition);

            fs.writeFile('./data/positions.json', JSON.stringify(objContent), () => {
                res.status(201).json(objContent);
            });
        }
    });

});

router.put('/', jsonParser, (req, res) => {
    let objContent;
    const changedEntry = {
        id: req.body.id,
        position: req.body.position,
        function: req.body.function,
        reportsTo: req.body.reportsTo
    };

    fs.readFile('./data/positions.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            objContent = JSON.parse(data);

            for (let i = 0; i < objContent.length; i++) {
                console.log(i);
                if (objContent[i].id === changedEntry.id) {

                    let oldEntry = objContent[i];
                    for (let key in objContent[i]) {
                        if (oldEntry[key] !== changedEntry[key]) {
                            oldEntry[key] = changedEntry[key]
                        }
                    }
                    break;
                }
            }

            fs.writeFile('./data/positions.json', JSON.stringify(objContent), () => {
                res.status(200).json(objContent);
            });
        }
    });
});

router.delete('/', jsonParser, (req, res) => {
    let objContent;
    const idDelete = req.body.id;

    fs.readFile('./data/positions.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            objContent = JSON.parse(data);

            for (let i = 0; i < objContent.length; i++ ) {
                if (objContent[i].id === idDelete) {
                    objContent.splice(i, 1);
                    break;
                }
            }
            fs.writeFile('./data/positions.json', JSON.stringify(objContent), () => {
                res.status(200).json(objContent);
            });
        }
    });
});

module.exports = router;
