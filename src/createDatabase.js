const { newsArticleModel } = require('./connector')
const { data } = require('./data')

const refreshAll = async () => {
    await newsArticleModel.deleteMany({})
    // console.log(connection)
    await newsArticleModel.insertMany(data)
}
refreshAll().then(()=> console.log("uploaded")).catch(error=>console.log("error occured",error));