const Router = require("koa-router");
const router = new Router();
const {getBaiduNewsAjax} = require('../module/baidu.js')
const {getWeiboNewsAjax} = require('../module/weibo.js')
const {get08NewsListByPages} = require('../module/08tuan')
const {getYaoHuoListByPages} = require('../module/yaohuo')
const {getDoubanBuyListByPages} = require('../module/doubanBuy.js')

router.get("/", (ctx, next) => {
  ctx.body = "<h1>服务器请求成功</h1>";
});
router.get('/baiduNews',async(ctx,next)=>{
    ctx.body = await getBaiduNewsAjax()
})
router.get('/weiboNews',async(ctx,next)=>{
    ctx.body = await getWeiboNewsAjax()
})
router.get('/08News/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await get08NewsListByPages(page||3)
})
router.get('/yaohuo/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getYaoHuoListByPages(page||5)
})
router.get('/doubanBuy/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getDoubanBuyListByPages(page||3)
})
module.exports = router;