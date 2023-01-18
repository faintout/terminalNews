const {axios }  = require('./../api')
//获取百度新闻接口数据
const getBaiduNewsAjax = async ()=>{
    try{
       const {data} =  await axios.get('https://top.baidu.com/board?tab=realtime')
       const reg = /{"data":{"cards":.*?"showScrollToTop":false}/g;
       const resJSOn = data.match(reg)
       const {data:{cards}} = JSON.parse(resJSOn[0])
       console.clear()
       console.log('\033[40;33m本次更新百度：'+cards[0].content.length+'条新闻')
       console.log("")
       cards[0].content.map((card,index)=>{
           console.log('\033[40;32m'+(index+1)+'.'+card.query)
           console.log('\033[40;30m'+(card.desc||'---'))
           console.log(card.url)
           console.log("")
       })
    }catch(e){
        console.log(e);
        console.log('get news error :'+e.toString());
    }
}

module.exports = {
    getBaiduNewsAjax
};