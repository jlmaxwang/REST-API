console.log('ok')
const express = require('express');
const app = express();
// body-parser
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://admin:adminpassword@cluster0.h0fsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useUnifiedTopology: true
}, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  const db = client.db('quotes')
  const quotesCollection = db.collection('quotes')

  app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', (req, res) => {res.sendFile(__dirname + '/index.html')})
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.listen(3000, function() {
      console.log('listening on 3000')
    })
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
    })
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error))
        res.render('index.ejs', {})

    })
})
// .catch(console.error)
