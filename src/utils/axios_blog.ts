import axios from "axios"
import token_util from "./token_util";
import "./token_util"

let protocol = window.location.protocol; //协议
let host = window.location.hostname; //主机
let reg = /^localhost+/;
let baseURL: string
if(reg.test(host)) {
    baseURL = 'http://127.0.0.1:8080';
} else {
    baseURL = protocol + "//" + host + ":8080";
}

console.log(baseURL)



const api = axios.create({
	baseURL, //请求后端数据的基本地址，自定义
	timeout: 2000,                   //请求超时设置，单位ms
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    function(config)
    {
        let token = token_util.get_token()
        if (token){
            if (config.headers){
                config.headers.authentication = token
            }
        }
        return config;
    }
)

api.interceptors.response.use(
    function(response)
    {

       
        return response;
    }
)

export default api;
