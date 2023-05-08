
const instance = require("axios");
const axios = instance.create({});
axios.interceptors.request.use(
    (config) => {
    //设置请求头，否则请求后的数据不对
      config.headers = {
        ...config.headers,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        // 这里巨坑！这里开启了gzip的话http返回来的是Buffer。
        // 'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
      }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
  (response) => {
      //内部
      if (response.status === 200 ) {
          return Promise.resolve(response);
      } else {
          console.log('当前接口获取失败： '+response.config.url);
          return Promise.reject(response)
      }
  },
  (error) => {
      //外部
      console.log('当前接口: '+error.config.url+' 获取失败：'+error.toString());
      return Promise.reject(error);
  }
)
module.exports ={
    axios
}