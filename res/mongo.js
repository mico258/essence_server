const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017";


var database = MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
    .then((connection) => {
        var method = connection.db("essence").collection('method');
        console.log("Database connection established")

    })
    .catch((err) => console.error(err))

module.exports = database
