const express = require('express')
const app = express()
const port = 8080

// const onePageArticleCount = 10
const { newsArticleModel } = require('./connector');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let defaultLimit= 10, defaultOffset= 0;
// const tempArray= [1,2,3,4,5,6,7,8,9,10];
app.get('/newFeeds',(req,res)=>{
    let limitReceived= (req.query.limit);
    let offsetReceived= (req.query.offset);
    // console.log(typeof limit);
    let limit,offset;
    limit=parseInt(limitReceived);
    offset= parseInt(offsetReceived);
    if(!limitReceived){
        limit= defaultLimit;
    }
    if(!offsetReceived){
        offset= defaultOffset;
    }
    if(isNaN(offset)){
        offset=defaultOffset;
    }
    if(isNaN(limit)){
        limit=defaultLimit;
        if(!offsetReceived){
            offset=defaultOffset;
        }
    }
    newsArticleModel.find().then(result=>{
        let start= 0;
        start+= offset;
        let resultArray=[];
        for(let startIndex= start;startIndex<start+limit;startIndex++){
            resultArray.push(result[startIndex]);
        }
        res.json(resultArray);
    }).catch(_=> res.json([]));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;