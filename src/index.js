const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10
const { newsArticleModel } = require('./connector');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let defaultLimit= 10, defaultOffset= 0;
let start=0;
app.get('/newFeeds',(req,res)=>{
    let limit= parseInt(req.query.limit);
    let offset= parseInt(req.query.offset);
    if(!limit){
        limit= defaultLimit;
    }
    if(!offset){
        offset= defaultOffset;
    }
    newsArticleModel.find().then(result=>{
        start+= offset;
        res.json(result.splice(start,start+limit));
    }).catch(_=> res.json([]));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;