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
            `https://www.baidu.com/home/feed/feedwater?id=2&offset=${page}&sessionId=&crids=&req_type=1&bsToken=298f3897c1fb5ae626beb76b1ae59477&pos=&newsNum=&needAd=1&refresh_state=-1&ismain=1&indextype=manht&_req_seqid=0xb7baac6900019295&asyn=1&t=1710224271446&sid=`,
            {
                headers:{
                    Cookie:'BIDUPSID=3004821E1825AD4F43730158BBB9B9C3; PSTM=1683362662; BAIDUID=3004821E1825AD4F20ECF7806267953A:FG=1; BDUSS=o4NVg4RzhDQ09VdW1ZSDBhMVhlT1BOQm1jY1FZbTktYWFNZlZnemtTZGVLLUJsRVFBQUFBJCQAAAAAAAAAAAEAAADVYcs5ZmFpbnRvdXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF6euGVenrhlen; BDUSS_BFESS=o4NVg4RzhDQ09VdW1ZSDBhMVhlT1BOQm1jY1FZbTktYWFNZlZnemtTZGVLLUJsRVFBQUFBJCQAAAAAAAAAAAEAAADVYcs5ZmFpbnRvdXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF6euGVenrhlen; BD_UPN=12314753; H_WISE_SIDS_BFESS=40008_40171_40210_40207_40216_40224_40059_40274_40294_40287_40284_40318_40079_40365; MCITY=-148%3A131%3A; H_WISE_SIDS=40008_40171_40210_40207_40216_40224_40274_40294_40287_40284_40079_40365_40303_40373_40369_40317_40334_40397; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID_BFESS=3004821E1825AD4F20ECF7806267953A:FG=1; delPer=0; BD_CK_SAM=1; PSINO=1; BA_HECTOR=000g0hah2l2ka52g8025218h14taq21iuvc1q1t; ZFY=SGpQylXIApeo85h1SZKspfvWOP2zIBjBIy0s5EbxC9Q:C; H_PS_PSSID=40171_40210_40207_40216_40224_40274_40294_40287_40284_40079_40365_40303_40373_40369_40317_40334_40397_40415; BDRCVFR[feWj1Vr5u3D]=mk3SLVN4HKm; B64_BOT=1; sugstore=1; H_PS_645EC=73cd729t3pRWe4yPFivKD5Pvq4ylHlDsFUd9TMPv2F%2FM%2Fzx8xw9h8B57DNpRDKEPFRlf'
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