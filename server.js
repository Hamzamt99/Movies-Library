'use strict'

const express = require('express');

const cors = require('cors');

require('dotenv').config();

const file = require('./Movie-Data/data.json');

const axios = require('axios');

const pg = require('pg')

const client = new pg.Client(process.env.DBURL)

const app = express();

app.use(cors())
app.use(express.json());


app.get('/', Data)
app.get('/favorite', favoritePage)
app.get('/trending', trendingPage)
app.get('/search', Search)
app.get('/rate', ratePage)
app.get('/Upcoming', UpcomingPage)
app.get('/getMovies',getMoviePage)
app.post('/addMovie',handleAddMovie)


function getMoviePage(req,res){
const sql = `select * from add_Movie`;
client.query(sql).then(db => {
    res.json(db.rows)
})
}

function handleAddMovie(req, res) {
    const userInput = req.body;
    const sql = `insert into add_Movie(title, original_language, original_title, overview,comment) values($1, $2, $3, $4,$5) returning *`;
  
    const handleValueFromUser = [userInput.title, userInput.original_language, userInput.original_title, userInput.overview,userInput.comment];
  
    client.query(sql, handleValueFromUser).then(data => {
      res.status(201).json(data.rows)
    })
  }



function ratePage(req, res) {

    axios.get(`${process.env.TURL}?api_key=${process.env.KEY}`).then(movie => res.status(201).json(movie.data))

}

function UpcomingPage(req, res) {
    axios.get(`${process.env.UPURL}?api_key=${process.env.KEY}`).then(up => res.status(202).json(up.data))
}

function favoritePage(req, res) {

    res.status(201).send('Welcome to Favorite Page')
}

app.use('*', notFoundPage)

app.use(Error500)

const PORT = process.env.PORT || 3002;

async function Search(req, res) {

    let movieSearch = req.query.movie;

    let axiosdata = await axios.get(`${process.env.NURL}?api_key=${process.env.KEY}&query=${movieSearch}`)

    res.status(200).json(axiosdata.data)

}



function Data(req, res) {

    res.status(200).send('welcometo home page')
}

function trendingPage(req, res) {

    axios.get(`${process.env.URL}?api_key=${process.env.KEY}`).then(result => {

        const allData = result.data.results

        allData.map(item =>

            new Movies(item.id, item.title, item.poster_path, item.release_date, item.overview)
        )
        res.status(201).json(allMovies)
    })

}

const allMovies = [];

function Movies(id, title, poster_path, release_date, overview) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.overview = overview;
    allMovies.push(this)
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
client.connect().then( ()=> {

    app.listen(PORT, () =>  console.log('test'))
})