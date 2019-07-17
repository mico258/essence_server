require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017";
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const db = require('./res/mongo');
const ObjectID = require("mongodb").ObjectID;
require('koa-qs')(app, 'strict')

app.use(bodyParser({
    detectJSON: function (ctx) {
        return /\.json$/i.test(ctx.path);
    },
    extendTypes: {
        json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
    },

}));
app.use(cors());

const index = new router();

index.get('/', function (ctx, next) {
    ctx.status = 200;
    ctx.body = "Essence Editor Server is Online";
});

// List all people
index.get("/method", async (ctx) => {
    await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .then(async (connection) => {
            await connection.db("essence").collection('method').find({}).toArray().then((result) => {
                console.log("Database connection established")
                ctx.body = JSON.stringify(result)
            }).catch((err) => console.error(err));


        })
        .catch((err) => console.error(err))
});

index.get("/method/:id", async (ctx) => {
    await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .then(async (connection) => {
            await connection.db("essence")
                .collection('method')
                .findOne({"_id": ObjectID(ctx.params.id)})
                .then((result) => {
                console.log("Database connection established")
                ctx.body = JSON.stringify(result)
            }).catch((err) => console.error(err));


        })
        .catch((err) => console.error(err))
});

index.put("/method/:id", async (ctx) => {

    var newvalues = { $set: ctx.request.body };
    await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .then(async (connection) => {
            await connection.db("essence").collection('method')
                .updateOne({"_id": ObjectID(ctx.params.id)},newvalues,{upsert : true}).then((result) => {
                console.log("Database connection established")
                ctx.body = JSON.stringify(result)
            }).catch((err) => console.error(err));


        })
        .catch((err) => console.error(err))
});

index.post("/method", async (ctx) => {
    console.log(ctx.request.body)
    await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .then(async (connection) => {
            await connection.db("essence")
                .collection('method')
                .insertOne(ctx.request.body)
                .then((result) => {
                console.log("Created Data Method")

                ctx.body = JSON.stringify(result)
            }).catch((err) => {
                console.error(err)

            });


        })
        .catch((err) => console.error(err))
});

app.use(index.routes()).use(index.allowedMethods());

let port = process.env.PORT;
app.listen(port);
console.log("App is listening. Port " + port);
