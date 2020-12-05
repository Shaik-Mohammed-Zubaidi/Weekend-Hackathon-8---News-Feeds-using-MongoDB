const express = require('express')
const app = express()
const port = 8080

// const onePageArticleCount = 10
const { newsArticleModel } = require('./connector');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let defaultLimit= 10, defaultOffset= 0;
let start=0;
app.get('/newFeeds',(req,res)=>{
    let limit= (req.query.limit);
    let offset= (req.query.offset);
    // console.log(typeof limit);
    if(!limit){
        limit= defaultLimit;
    }
    if(!offset){
        offset= defaultOffset;
    }
    limit=parseInt(limit);
    offset= parseInt(offset);
    newsArticleModel.find().then(result=>{
        start+= offset;
        res.json(result.splice(start,start+limit));
    }).catch(_=> res.json([]));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;