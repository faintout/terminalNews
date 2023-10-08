const {axios }  = require('./../api')
const {newTypeMap,Result } = require('./../utils')
let resData,success,msg
//获取百度新闻接口数据
const getBaiduNewsAjax = async ()=>{
    try{
       const {data} =  await axios.get('https://top.baidu.com/board?tab=realtime')
       const reg = /{"data":{"cards":.*?"showScrollToTop":false}/g;
       const resJSOn = data.match(reg)
       const {data:{cards}} = JSON.parse(resJSOn[0])
       console.log('\033[40;33m本次更新百度：'+cards[0].content.length+'条新闻')
       console.log("")
       const typeMap = newTypeMap.find(type=>type.typeName==='热')
        const typeColorStr = typeMap&&(typeMap.typeColor+typeMap.typeShowName)
       cards[0].content.map((card,index)=>{
           console.log('\033[40;32m'+(index+1)+'.'+card.query+(card.hotTag==='3'&&typeColorStr||''))
           console.log('\033[40;30m'+(card.desc||'---'))
           console.log(card.url)
           console.log("")
       })
       resData = cards[0].content
       msg = ''
       success = true
    }catch(e){
        console.log('获取百度内容失败 :' + e.toString());
        resData = []
        success = false
        msg = e.toString()
    }
    return new Result({
        data:resData,
        success,
        msg
    })
}

module.exports = {
    getBaiduNewsAjax
};