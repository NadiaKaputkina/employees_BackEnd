const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const jsonContent = require('../data/employees.json');
let jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.status(200).json(jsonContent);
});

router.post('/', jsonParser, (req, res) => {
    let objContent;
    const newEmployee = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        phone: req.body.phone,
        email: req.body.email
    };

    fs.readFile('./data/employees.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            objContent = JSON.parse(data);
            objContent.push(newEmployee);
            fs.writeFile('./data/employees.json', JSON.stringify(objContent), () => {
                res.status(201).json(objContent);
            });
        }
    });

});

router.put('/', jsonParser, (req, res) => {
    let objContent;
    const changedEntry = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        phone: req.body.phone,
        email: req.body.email
    };

    fs.readFile('./data/employees.json', (err, data) => {
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

            fs.writeFile('./data/employees.json', JSON.stringify(objContent), () => {
                res.status(200).json(objContent);
            });
        }
    });
});

router.delete('/', jsonParser, (req, res) => {
    let objContent;

    const idDelete = req.body.id;
    console.log(`idDelete - ${idDelete}`);

    fs.readFile('./data/employees.json', (err, data) => {
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
            fs.writeFile('./data/employees.json', JSON.stringify(objContent), () => {
                res.status(200).json(objContent);
            });
        }
    });
});

module.exports = router;
