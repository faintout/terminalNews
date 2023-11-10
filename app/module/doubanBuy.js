const { axios } = require('../api')
const cheerio = require('cheerio')
const {setTextColor,Result } = require('../utils.js')
const baseUrl = 'http://new.xianbao.fun/category-douban';
let data,success,msg
const getDoubanBuyListByPages = async (pages)=>{
    try{
        var allList = []
        for(let i=0;i<pages;i++){
            allList = [...allList,...await getDoubanBuyByPage(i+1)]
        }
        console.log(setTextColor(`本次更新豆瓣买组${allList.length}条`,'yellow'))
        allList.map((item,i)=>{
            const titleRow = setTextColor((i+1)+'.','white')+setTextColor(item.times+' ','magenta') +setTextColor(item.title+' ','green')
            console.log(titleRow)
            console.log(setTextColor(item.url+' ','black'))
            console.log();
        })
        data = allList
        msg = ''
        success = true
    }catch(e){
        console.log('获取豆瓣买组内容失败 :' + e.toString());
        success = false
        data = []
        msg = e.toString()
    }
    return new Result({
        data,
        success,
        msg
    })
}
//获取08团列表数据by Page 
const getDoubanBuyByPage = (page)=>{
    return new Promise(async res=>{
        const { data } =  await axios.get(`${baseUrl}/${page===1?'':page}`)
        res(makeHtmlToJson(data))
    })
}
//拼接html结构toJson
const makeHtmlToJson = (html)=>{
    const $ = cheerio.load(html);
    
    // 查找所有的.article-list元素
    const articles = $('.article-list').not('.top');

    let dataList = []
    // 遍历所有的.article-list元素
    articles.each(function () {
        // 在这个上下文中，'this'指向当前的.article-list元素
        const article = $(this);
        // 检查是否有top类
        // 获取时间
        const time = article.find('time').attr('title');
        // 获取标题
        const title = article.find('a').attr('title');
        // 获取链接
        const href = 'http://new.xianbao.fun'+article.find('a').attr('href');
        const params = {
            times:time,
            title,
            url:href
        }
        dataList = [...dataList,params]
    });
    return dataList
}
module.exports = {
    getDoubanBuyListByPages
}