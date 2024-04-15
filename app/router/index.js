const Router = require("koa-router");
const router = new Router();
const {getBaiduNewsAjax,getBaiduNewsRecommendedAllByPage} = require('../module/baidu.js')
const {getWeiboNewsAjax} = require('../module/weibo.js')
const {get08NewsListByPages} = require('../module/08tuan')
const {getYaoHuoAllListByPages,getYaoHuoListByPage} = require('../module/yaohuo')
const {getDoubanBuyListByPages} = require('../module/doubanBuy.js')

router.get("/", (ctx, next) => {
  ctx.body = "<h3>服务器请求成功</h3>";
  ctx.body += "<h3>接口地址如下</h3> <br/>";
  ctx.body+=router.stack.map(stack=>`<a href="${stack.path}" target="_blank">${stack.path}</a>`).join('<br/>')
});
router.get('/baiduNews',async(ctx,next)=>{
    ctx.body = await getBaiduNewsAjax()
})
router.get('/baiduRecommendedNewsByPages/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getBaiduNewsRecommendedAllByPage(page??5)
})
router.get('/weiboNews',async(ctx,next)=>{
    ctx.body = await getWeiboNewsAjax()
})
router.get('/08News/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await get08NewsListByPages(page??3)
})
router.get('/yaohuoAll/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getYaoHuoAllListByPages(page??5)
})
router.get('/yaohuo/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getYaoHuoListByPage(page??1)
})
router.get('/doubanBuy/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getDoubanBuyListByPages(page??3)
})
module.exports = router;