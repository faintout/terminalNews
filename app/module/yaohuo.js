const { axios } = require('./../api')
const cheerio = require('cheerio')
const {setTextColor,Result } = require('../utils.js');
let data,success,msg
const baseUrl = 'https://www.yaohuo.me/';
const cookie = 'GUID=42548d1809125600; _ga=GA1.1.618367009.1683364117; _ga_DWD6C2XC51=GS1.1.1694772000.379.1.1694775490.60.0.0; _clck=zk1x4t%7C2%7Cfh5%7C0%7C1412; sidyaohuo=0D7AADFD732B640_602_01292_15020_11001-2-0-0-0-0'
const getYaoHuoAllListByPages = async(pages)=>{
    try{
        validate(pages)
        let allPromiseList = []
        for(let i=0;i<pages;i++){
            allPromiseList.push(getListByPage(i+1)) 
        }
        return makeData(allPromiseList)
    }catch(error){
        console.log('yaohuo获取内容失败:',error.toString());
        return new Result({
            data: [],
            success: false,
            msg: error.message
        });
    }
}
const validate = async (pages) => {
    if (!pages) {
        throw new Error('yaohuo：请传入页数');
    }
    if (isNaN(pages)) {
        throw new Error('yaohuo：页数必须是数字');
    }
}

const getYaoHuoListByPage = async(page)=>{
    try{
        await validate(page)
        let allPromiseList = []
        allPromiseList.push(getListByPage(page)) 
        return makeData(allPromiseList)
    }catch(error){
        console.log('yaohuo获取内容失败:',error.toString());
        return new Result({
            data: [],
            success: false,
            msg: error.message
        });
    }
}


//组装结构
const makeData = async(allPromiseList)=>{
    try{
        let allList = await Promise.all(allPromiseList)
        if(allList.toString().includes('身份失效了')){
            console.log(setTextColor('yaohuo：cookie失效,请重新设置！'+'','yellow'))
            throw new Error('yaohuo：cookie失效,请重新设置')
        }
        allList = allList.map(list=>makeHtmlToJson(list.data)).flat(Infinity)
        console.log(setTextColor(`本次更新yaohuo${allList.length}条`,'yellow'))
        console.log("")
        if(!allList.length){
            console.log(setTextColor('yaohuo：获取0条，可能是cookie失效！'+'','yellow'))
            throw new Error('yaohuo：获取0条，可能是cookie失效！')
        }
        allList.map((item,i)=>{
            const titleRow = setTextColor((i+1)+'.','white') + setTextColor(item.iconNameStr+'','yellow')+ setTextColor(item.title+' ','green') + setTextColor(item.times+'','magenta')
            console.log(titleRow)
            console.log(setTextColor(item.url+' ','black'))
            console.log();
        })
        data = allList
        msg = ''
        success = true
    }catch(e){
        console.log('yaohuo获取内容失败:',e.toString());
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
            const url = baseUrl.slice(0,-1) + $('.topic-link',this).eq(0).attr('href')
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
    getYaoHuoAllListByPages,
    getYaoHuoListByPage
}