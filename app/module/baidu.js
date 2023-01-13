// import axios from 'axios'
const axios = require("axios");
const fs=require('fs')
let path = require('path');
let PUBLIC_PATH = path.resolve(__dirname, 'writeHtml.txt');
const instance = axios.create({});
//截取热搜列表正则规则
const reg = /{"data":{"cards":.*?"showScrollToTop":false}/g;
instance.interceptors.request.use(
    (config) => {
    //设置请求头，否则请求后的数据不对
      config.headers = {
        ...config.headers,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        // 这里巨坑！这里开启了gzip的话http返回来的是Buffer。
        // 'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
      }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
//获取百度新闻接口数据
const getBaiduNewsAjax = async ()=>{
    try{
       const {data} =  await instance.get('https://top.baidu.com/board?tab=realtime')
       const reg = /{"data":{"cards":.*?"showScrollToTop":false}/g;
       const resJSOn = data.match(reg)
       const {data:{cards}} = JSON.parse(resJSOn[0])
       console.clear()
       cards[0].content.map(card=>{
           console.log('\033[40;32m'+card.query)
           console.log('\033[40;30m'+(card.desc||'---'))
           console.log(card.url)
           console.log("")
       })
    }catch(e){
        console.log(e);
        console.log('get news error :'+e.toString());
    }
}
//获取百度新闻接口文件数据
const getBaiduNewsLocal = async ()=>{
    try{
        fs.readFile(PUBLIC_PATH,'utf8',function(err,htmlStr){
            const regResult = htmlStr.match(reg)
            const {data:{cards}} = JSON.parse(regResult[0])
            console.clear()
            cards[0].content.map(card=>{
                console.log('\033[40;32m'+card.query)
                console.log('\033[40;30m'+(card.desc||'---'))
                console.log("")
            })
          })

    }catch(e){
        console.log(e);
        console.log('get news error :'+e.toString());
    }
}
module.exports = {
    getBaiduNewsAjax,
    getBaiduNewsLocal
};