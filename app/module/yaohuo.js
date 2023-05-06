const { axios } = require('./../api')
const cheerio = require('cheerio')
const {setTextColor } = require('../utils.js')
const baseUrl = 'https://www.yaohuo.me/';
const cookie = 'GUID=2563660410175686; _gid=GA1.2.730229516.1683166676; sidwww=0D7AADFD732B640_602_01297_13690_61001-2; ASP.NET_SessionId=odtauv454oyxfk45azd1vq45; _gat_gtag_UA_88858350_1=1; _ga=GA1.1.1291502645.1683166676; _ga_DWD6C2XC51=GS1.1.1683351420.14.1.1683351880.0.0.0'
const getYaoHuoListByPages = async (pages)=>{
    let allPromiseList = []
    for(let i=0;i<pages;i++){
        allPromiseList.push(getListByPage(i)) 
    }
    let allList = await Promise.all(allPromiseList)
    if(allList[0].data.includes('身份失效了')){
        console.log(setTextColor('yaohuo：cookie失效,请重新设置！'+'','yellow'))
        return
    }
    allList = allList.map(list=>makeHtmlToJson(list.data)).flat(Infinity)
    console.log(setTextColor(`本次更新yaohuo${allList.length}条`,'yellow'))
    console.log("")
    allList.map((item,i)=>{
        const titleRow = setTextColor((i+1)+'.','white') + setTextColor(item.iconNameStr+'','yellow')+ setTextColor(item.title+' ','green') + setTextColor(item.times+'','magenta')
        console.log(titleRow)
        console.log(setTextColor(item.url+' ','black'))
        console.log();
    })
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