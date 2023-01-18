const Koa = require('koa');
const app = new Koa();
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
const {getBaiduNewsAjax} = require('./app/module/baidu.js')
const {getWeiboNewsAjax} = require('./app/module/weibo.js')
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
})


app.listen(9706, () => {
    console.log("News Start");
});
console.clear()
getBaiduNewsAjax()
getWeiboNewsAjax()