// const express = require("express");
const Koa = require('koa');
const app = new Koa();
// const { createToken, decodeToken } = require("./app/jwt")

// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
const bodyParser = require("koa-bodyparser");
// const router = require('./app/router');
// app.use(cors) //解决跨域
// app.use(bodyParser.json());
app.use(bodyParser());
const {getBaiduNewsLocal,getBaiduNewsAjax} = require('./app/module/baidu.js')
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    // console.log('header', ctx.request.header)
    // console.log('header',ctx.request.header)
    // return ctx.body = ctx
    // if (ctx.request.url == '/login') {
    //    return await next() 
    // }
    // else if (!ctx.request.header.token) {
    //     console.log('不走！')
    //     return ctx.body = { msg: '请登录', success: false, code: 108 }
    // }else{
    //     //验证token
    //         console.log(decodeToken(ctx.request.header.token))
    //         if(decodeToken(ctx.request.header.token).code==200){
    //             return await next()
    //         }else{
    //             return ctx.body = { msg: '未登陆状态，请重新登录！', success: false, code: 109 }
    //         }

    // }
    await next();
})

//测试
// app
//     .use(passport.initialize())
//     .use(passport.session())
// app.use(bodyParser.urlencoded({ extended: false })); //表单请求


// app.use('/',router)

// app.use(router.routes())
// app.use(router.allowedMethods())

// app.use( async (ctx,next)=>{ 
//     ctx.body='hello koa2'
//     // console.log('ctx',ctx);
//     // await next()
// })
// app.use(router.routes());


app.listen(9706, () => {
    console.log("News Start");
});
// getBaiduNewsLocal()
getBaiduNewsAjax()
//解决跨域
// app.all('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     if (req.method == 'OPTIONS') {
//       res.send(200);
//     }
//     else {
//       next();
//     }
//   });

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });