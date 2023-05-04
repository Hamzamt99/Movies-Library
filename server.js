'use strict'

const express = require('express');

const cors = require('cors');

const file = require('./data.json')

const app = express();

app.use(cors())

app.get('/', Data)

app.get('/favorite', favoritePage)

function favoritePage(req, res) {
    res.status(201).send('Welcome to Favorite Page')
}

app.use('*', notFoundPage)

app.use(Error500)



function Data(req, res) {
    const movie = new Movies(file.title, file.poster_path, file.overview)
    res.status(201).json(movie);
}


function Movies(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

function notFoundPage(req, res) {
    res.status(404).json({
        code: 404,
        responseTxt: 'Page Not Found!!'
    })
}
function Error500(err, req, res) {
    if (err.status === 500) {
        res.status(500).json({
            status: 500,
            responseText: "Sorry, something went wrong"
        })
    }

}
app.listen(3000, () => {
    console.log('test')
})