require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router');
const koabody = require('koa-body');
const cors = require('@koa/cors');

const { Method, Alpha, Intention } = require('./res/sequalize');

app.use(koabody({
    // formidable:{
    //     uploadDir: __dirname + '/public/uploads', // directory where files will be uploaded
    //     keepExtensions: true // keep file extension on upload
    // },
    multipart: true,
    urlencoded: true,
}));
app.use(cors());

const index = new router();

index.get('/', function (ctx, next) {
    ctx.status = 200;
    ctx.body = "Essence Editor Server is Online";
});

app.use(index.routes()).use(index.allowedMethods());

let port = process.env.PORT;
app.listen(port);
console.log("App is listening. Port " + port);
