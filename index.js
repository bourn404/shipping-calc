const express = require('express')
const path = require('path')
const prices = require('./prices.js');

var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json()) // support json encoded bodies
    .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post('/', (req, res) => {
        switch (req.query.method) {
            case 'stamp':
                prices.getPriceLetterStamped(req.body.weight, (error, result) => {
                    res.render('pages/result', { error, result }); // object property value shorthand
                });
                break;
            case 'meter':
                prices.getPriceLetterMetered(req.body.weight, (error, result) => {
                    res.render('pages/result', { error, result }); // object property value shorthand
                });
                break;
            case 'large':
                prices.getPriceLargeEnvelope(req.body.weight, (error, result) => {
                    res.render('pages/result', { error, result }); // object property value shorthand
                });
                break;
            case 'parcel':
                prices.getPricePackageRetail(req.body.weight, req.body.zone, (error, result) => {
                    res.render('pages/result', { error, result }); // object property value shorthand
                });
                break;
        }
    })
    .get('/price_service', (req, res) => {
        switch (req.query.method) {
            case 'stamp':
                prices.getPriceLetterStamped(req.query.weight, (error, result) => {
                    res.json({ error, result }); // object property value shorthand
                });
                break;
            case 'meter':
                prices.getPriceLetterMetered(req.query.weight, (error, result) => {
                    res.json({ error, result }); // object property value shorthand
                });
                break;
            case 'large':
                prices.getPriceLargeEnvelope(req.query.weight, (error, result) => {
                    res.json({ error, result }); // object property value shorthand
                });
                break;
            case 'parcel':
                prices.getPricePackageRetail(req.query.weight, req.query.zone, (error, result) => {
                    res.json({ error, result }); // object property value shorthand
                });
                break;
        }
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))