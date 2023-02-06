require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const uri = process.env.DATABASE_URI;

//middleware
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

//connect to database
MongoClient.connect(uri, {
    useUnifiedTopology: true
})
.then( client => {
    console.log('Connected to Database')
    const db = client.db('coin-flip')
    const PORT = 3000
    const scores = db.collection('score')


// ROUTES AND REQUESTS

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/flip', (req, res) => {
    function flipCoin() {
        const choices = ['heads', 'tails']
        const randomSide = Math.floor(Math.random() * choices.length)
        return choices[randomSide]      
}   
let name = req.body.playerName

if (flipCoin() === req.body.result) {
    // TODO: add POST to score database if win
    //  res.json('You Win')
    // console.log(`${name} wins`)
    scores.updateOne(
        { name: name },
        { $inc: { wins: 1}},
        { upsert: true },
        function(err, result) {
            if (err) throw err
        }        
    );
    res.json('You Win')
     return;
} 

else {
    console.log(`${name} loses`);
    scores.updateOne(
      { name: name },
      { $inc: { losses: 1 } },
      { upsert: true },
      function(err, result) {
        if (err) throw err;
      }
    );
    res.json('You Lose');
    return;
  }
});


app.listen(3000,  () => {
    // console.log('listening')
})



})


// coin logic will be buttons on main index heads or tails (send post request)
//  post request will kick off logic on the server with flipCoin function 
// and render heads or tails and if users choice is winner or not
//
//
