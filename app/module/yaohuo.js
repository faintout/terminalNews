const { axios } = require('./../api')
const cheerio = require('cheerio')
const {setTextColor } = require('../utils.js')
const baseUrl = 'https://www.yaohuo.me/';
const cookie = 'ASP.NET_SessionId=qngljpmoon21zbuwyur10cfi; GUID=4aea6a0616460717; GET11292=; sidwww=0D7AADFD732B640_602_01292_17320_41001-2'
const getYaoHuoListByPages = async (pages)=>{
    try{
        let allPromiseList = []
        for(let i=1;i<pages;i++){
            allPromiseList.push(getListByPage(i)) 
        }
        let allList = await Promise.all(allPromiseList)
        if(allList.toString().includes('身份失效了')){
            console.log(setTextColor('yaohuo：cookie失效,请重新设置！'+'','yellow'))
            return
        }
        allList = allList.map(list=>makeHtmlToJson(list.data)).flat(Infinity)
        console.log(setTextColor(`本次更新yaohuo${allList.length}条`,'yellow'))
        console.log("")
        if(!allList.length){
            console.log(setTextColor('yaohuo：获取0条，可能是cookie失效！'+'','yellow'))
            return
        }
        allList.map((item,i)=>{
            const titleRow = setTextColor((i+1)+'.','white') + setTextColor(item.iconNameStr+'','yellow')+ setTextColor(item.title+' ','green') + setTextColor(item.times+'','magenta')
            console.log(titleRow)
            console.log(setTextColor(item.url+' ','black'))
            console.log();
        })
    }catch(e){
        console.log('yaohuo获取内容失败:',e.toString());
        return
    }
}
//获取列表数据by Page 
const getListByPage = (page)=>{
    return axios.get(`${baseUrl}/bbs/book_list.aspx?action=new&siteid=1000&classid=0&getTotal=2023&page=${page}`,{ headers: {cookie}})
}
//拼接html结构toJson
const makeHtmlToJson = (html)=>{
    try{
        const $ = cheerio.load(html);
        const list = $('body').children('.listdata')
        var dataList = []
        list.each(function(){
            const title = $('.topic-link',this).eq(0).text()
            const times = $(this).children('.right').text()
            const url = baseUrl + $('.topic-link',this).eq(0).attr('href')
            let iconNameStr= ''
            $(this).children('img').each((index, element) => {
              const alt = $(element).attr('alt');
              iconNameStr+=alt
            });
            iconNameStr = iconNameStr?`[${iconNameStr}]`:''
            const params = {
                times,
                title,
                url,
                iconNameStr
            }
            dataList = [...dataList,params]
        })
        return dataList
    }catch(e){
        console.log('e',e);
    }
}
module.exports = {
    getYaoHuoListByPages
}