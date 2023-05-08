const { axios } = require('./../api')
const cheerio = require('cheerio')
const {setTextColor } = require('../utils.js')
const baseUrl = 'http://www.0818tuan.com/';
const get08NewsListByPages = async (pages)=>{
    try{
        var allList = []
        for(let i=0;i<pages;i++){
            allList = [...allList,...await get08NewsByPage(i)]
        }
        console.log(setTextColor(`本次更新08团线报${allList.length}条`,'yellow'))
        allList.map((item,i)=>{
            const titleRow = setTextColor((i+1)+'.','white')+setTextColor(item.times+' ','magenta') +setTextColor(item.title+' ','green')
            console.log(titleRow)
            console.log(setTextColor(item.url+' ','black'))
            console.log();
        })
    }catch(e){
        console.log('获取08tuan内容失败 :' + e.toString());
    }
}
//获取08团列表数据by Page 
const get08NewsByPage = (page)=>{
    return new Promise(async res=>{
        const { data } =  await axios.get(`${baseUrl}/list-1-${page}.html`)
        res(makeHtmlToJson(data))
    })
}
//拼接html结构toJson
const makeHtmlToJson = (html)=>{
    const $ = cheerio.load(html);
    const list = $('#redtag').children('.list-group-item')
    var dataList = []
    list.each(function(){
        const times = $('.badge',this).text()
        $('.badge',this).remove()
        const url = baseUrl + $(this).attr('href')
        const params = {
            times,
            title:$(this).text(),
            url
        }
        dataList = [...dataList,params]
    })
    return dataList
}
module.exports = {
    get08NewsListByPages
}