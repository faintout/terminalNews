const Koa = require('koa');
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const router = require('./app/router/index.js');
app.use(bodyParser());
const {getBaiduNewsAjax,getBaiduNewsRecommendedAllByPage} = require('./app/module/baidu.js')
const {getWeiboNewsAjax} = require('./app/module/weibo.js')
const {get08NewsListByPages} = require('./app/module/08tuan')
const {getYaoHuoListByPages} = require('./app/module/yaohuo')
const {getDoubanBuyListByPages} = require('./app/module/doubanBuy')
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
})

app.use(router.routes());
app.listen(8090, () => {
    console.log("News Start");
});
console.clear()
const promiseGetList = [
    getBaiduNewsAjax(),
    getBaiduNewsRecommendedAllByPage(5),
    getWeiboNewsAjax(),
    get08NewsListByPages(3),
    getYaoHuoListByPages(5),
    getDoubanBuyListByPages(1),
]
Promise.all(promiseGetList).finally(()=>{
            console.log('信息获取结束！');
    })