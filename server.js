const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://rondonson:clockhit@cluster0.ymn1ivm.mongodb.net/?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')


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
console.log(req.body)


})


app.listen(3000,  () => {
    // console.log('listening')
})



})


// coin logic will be buttons on main index heads or tails (send post request)
//  post request will kick off logic on the server with flipCoin function 
// and render heads or tails and if users choice is winner or not
//
//
