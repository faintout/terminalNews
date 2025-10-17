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
// 样式调整为黑色背景
  ctx.body += "<style>body{background-color: #282828;color: yellowgreen;} a{color: dodgerblue;}</style>";
});
router.get('/baiduNews',async(ctx,next)=>{
    ctx.body = await getBaiduNewsAjax()
})
router.get('/baiduRecommendedNewsByPages/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getBaiduNewsRecommendedAllByPage(isNaN(page) ? 5 : page)
})
router.get('/weiboNews',async(ctx,next)=>{
    ctx.body = await getWeiboNewsAjax()
})
router.get('/08News/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await get08NewsListByPages(isNaN(page) ? 5 : page)
})
router.get('/yaohuoAll/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getYaoHuoAllListByPages(isNaN(page) ? 5 : page)
})
router.get('/yaohuo/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getYaoHuoListByPage(isNaN(page) ? 5 : page,ctx)
})
router.get('/doubanBuy/:page',async(ctx,next)=>{
    let page = ctx.params.page;
    ctx.body = await getDoubanBuyListByPages(isNaN(page) ? 5 : page)
})
module.exports = router;