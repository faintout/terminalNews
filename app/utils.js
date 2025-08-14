const newTypeMap = [
    {
        typeName:'热',
        typeShowName:'[热]',
        //黄色
        typeColor:'\x1B[33m'
    },
    {
        typeName:'沸',
        typeShowName:'[沸]',
        //红
        typeColor:'\x1B[31m'
    },
    {
        typeName:'新',
        typeShowName:'[新]',
        //蓝色
        typeColor:'\x1B[34m'
    },
]
//延时函数
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))
//随机生成1-300秒的延迟
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const consoleColorMap = {
    'bright'    : '\x1B[1m', // 亮色
    'grey'      : '\x1B[2m', // 灰色
    'italic'    : '\x1B[3m', // 斜体
    'underline' : '\x1B[4m', // 下划线
    'reverse'   : '\x1B[7m', // 反向
    'hidden'    : '\x1B[8m', // 隐藏
    'black'     : '\x1B[30m', // 黑色
    'red'       : '\x1B[31m', // 红色
    'green'     : '\x1B[32m', // 绿色
    'yellow'    : '\x1B[33m', // 黄色
    'blue'      : '\x1B[34m', // 蓝色
    'magenta'   : '\x1B[35m', // 品红
    'cyan'      : '\x1B[36m', // 青色
    'white'     : '\x1B[37m', // 白色
    'blackBG'   : '\x1B[40m', // 背景色为黑色
    'redBG'     : '\x1B[41m', // 背景色为红色
    'greenBG'   : '\x1B[42m', // 背景色为绿色
    'yellowBG'  : '\x1B[43m', // 背景色为黄色
    'blueBG'    : '\x1B[44m', // 背景色为蓝色
    'magentaBG' : '\x1B[45m', // 背景色为品红
    'cyanBG'    : '\x1B[46m', // 背景色为青色
    'whiteBG'   : '\x1B[47m' // 背景色为白色
}
//设置文字颜色
const setTextColor = (text,color)=>{
    return consoleColorMap[color||'white']+text
}
class Result{
    constructor({ code = 200, msg = "", data = {}, success = true  }){
        this.code = code;
        this.msg = msg;
        this.success = success;
        this.data = data;
    }
}
// 获取当前日期
const getCurrDay = (targetTime) => {
    // 创建一个新的 Date 对象，它将包含当前的日期和时间
    const currentDate = targetTime?new Date(targetTime):new Date();
    // 获取当前日期的年、月、日
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，因此需要加 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds());

    // 将年、月、日拼接成所需格式的日期字符串
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
    return formattedDate
}
module.exports ={
    newTypeMap,
    setTextColor,
    Result,sleep,random,getCurrDay
}