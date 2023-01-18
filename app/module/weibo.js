
const {newTypeMap } = require('./../utils')
const {axios }  = require('./../api')
//获取百度新闻接口数据
const getWeiboNewsAjax = async ()=>{
    try{
       const {data:{data:{band_list}}} =  await axios.get('https://weibo.com/ajax/statuses/hot_band')
       console.clear()
       console.log('\033[40;33m本次更新微博热榜：'+band_list.length+'条新闻')
       console.log("")
    band_list.map((card,index)=>{
        const typeMap = newTypeMap.find(type=>type.typeName===card.icon_desc)
        const typeColorStr = typeMap&&(typeMap.typeColor+typeMap.typeShowName)
        console.log('\033[40;32m'+(index+1)+'.'+card.word+(typeColorStr||''))
        console.log('\033[40;30m'+'https://s.weibo.com/weibo?q=%23'+card.word.replace(' ','%20')+'%23')
        console.log("")
    })
    }catch(e){
        console.log(e);
        console.log('get news error :'+e.toString());
    }
}
module.exports = {
    getWeiboNewsAjax
};