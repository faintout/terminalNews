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

const getBaiduNewsRecommendedByPage = async page =>{
    try{
        const {data:{data}} = await axios.get(
            `https://www.baidu.com/home/feed/feedwater?id=2&offset=${page}&sessionId=&crids=&req_type=1&bsToken=e10bb8bb49384657726983a8a78a2ff5&pos=&newsNum=&needAd=1&refresh_state=-1&ismain=1&indextype=manht&_req_seqid=0xa54910d0000e30cc&asyn=1&t=1735812395045&sid=61218_60853_61491_61526_61522_61569_61610_61633`,
            {
                headers:{
                    Cookie:'BD_UPN=12314753; BAIDUID=36492082880F0B978D72CA3D22DA19CC:FG=1; BIDUPSID=36492082880F0B978D72CA3D22DA19CC; PSTM=1718071775; MAWEBCUID=web_YkuGpdeFeAhUtkxzuzhELYBEXUdHVRxefAiYrdRhYSfyySmbYt; BDUSS=gtME54N2cxMG9XLS03bDNuSm9vOUlkMDJycHFQYVhFMmdEWHRSWWthRVkzWGhuRVFBQUFBJCQAAAAAAAAAAAEAAADVYcs5ZmFpbnRvdXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhQUWcYUFFnel; BDUSS_BFESS=gtME54N2cxMG9XLS03bDNuSm9vOUlkMDJycHFQYVhFMmdEWHRSWWthRVkzWGhuRVFBQUFBJCQAAAAAAAAAAAEAAADVYcs5ZmFpbnRvdXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhQUWcYUFFnel; MCITY=-%3A; H_WISE_SIDS=61218_60853_61491_61429_61526_61522_61569_61610_61633; H_PS_PSSID=61218_60853_61491_61526_61522_61569_61610_61633; H_WISE_SIDS_BFESS=61218_60853_61491_61429_61526_61522_61569_61610_61633; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BA_HECTOR=8l248k8ha12l8ka4200la580ae2jju1jncb9r1u; BAIDUID_BFESS=36492082880F0B978D72CA3D22DA19CC:FG=1; ZFY=vKk9XbRKDkCutAO6cXKnXaI43KCtdrYpu7BnJ3I3a8Y:C; delPer=0; BD_CK_SAM=1; Hm_lvt_aec699bb6442ba076c8981c6dc490771=1734659670,1735105462,1735636585,1735798086; Hm_lpvt_aec699bb6442ba076c8981c6dc490771=1735798086; HMACCOUNT=614E8488019DA5DB; PSINO=7; COOKIE_SESSION=805_0_6_6_10_1_1_0_6_1_0_0_74_0_0_0_1735798092_0_1735798879%7C9%23109504_41_1687250794%7C6; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; sugstore=1; H_PS_645EC=8ac7kzOhW%2BBSErh7DpBrSYOPizxXyFQWqsOdVwaPmRZ6MZjcPAvH8kUbOKOgt5nyH9Bk'
                }
            }
        )
        // 使用正则表达式提取.s-news-item-title标签的title和href
        var regex = /<a class="s-news-item-title[^>]+href="([^"]+)"[^>]+title="([^"]+)"/g;
        var match;
        var result = [];
    
        while ((match = regex.exec(data)) !== null) {
            result.push({ title: match[2], href: match[1] });
        }
        return result
    }catch(e){
        return []
    }
}
const getBaiduNewsRecommendedAllByPage = async pages=>{
    try{
        var allList = []
        for(let i=0;i<pages;i++){
            allList = [...allList,...await getBaiduNewsRecommendedByPage(i)]
        }
          // 过滤广告信息
        allList = allList.filter(result => result.href.includes("newspage"));
        allList.map((list,index)=>{
            console.log('\033[40;32m'+(index+1)+'.'+list.title)
            console.log('\033[40;30m'+(list.href))
            console.log("")
        })
        return new Result({
            data:allList,
        })
    }catch(e){
        return new Result({
            data:allList,
        })
    }
}

module.exports = {
    getBaiduNewsAjax,
    getBaiduNewsRecommendedAllByPage
};