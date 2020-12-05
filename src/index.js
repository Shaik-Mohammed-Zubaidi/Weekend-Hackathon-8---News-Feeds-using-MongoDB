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
        if(offset<0 || offset+limit>result.length || isNaN(offset)){
            offset=0;
        }
        if(limit<0 || limit>result.length || isNaN(limit)){
            limit= 10;
        }
        let start= 0;
        start+= offset;
        let resultArray=[];
        for(let startIndex= start;startIndex<start+limit;startIndex++){
            resultArray.push(result[startIndex]);
        }
        // resultArray= result.map((news,index)=>{
        //     if(index===start)
        // })
        res.json(resultArray);
    }).catch(_=> res.json([]));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;