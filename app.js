const Koa = require('koa');
const app = new Koa();
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
const {getBaiduNewsAjax} = require('./app/module/baidu.js')
const {getWeiboNewsAjax} = require('./app/module/weibo.js')
const {get08NewsListByPages} = require('./app/module/08tuan')
const {getYaoHuoListByPages} = require('./app/module/yaohuo')
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
})


app.listen(9706, () => {
    console.log("News Start");
});
console.clear()
const promiseGetList = [
    getBaiduNewsAjax(),
    getWeiboNewsAjax(),
    get08NewsListByPages(3),
    getYaoHuoListByPages(5),
]
Promise.all(promiseGetList).finally(()=>{
            console.log('信息获取结束！');
    })