/*包含 n 个接口请求函数的模块
每个函数返回 promise
*/
import jsonp from "jsonp"
import ajax from "./ajax"

// 登陆
export const reqLogin = (username, password) => ajax("/login", { username, password }, "POST")

// 使用jsonp获取天气信息
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
        jsonp(url,{param:'callback'},(err,res)=>{
            if(!err && res.status === 'success') {
                const {dayPictureUrl, weather} = res.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                console.log('获取天气数据错误')
            }
        })
    })
}