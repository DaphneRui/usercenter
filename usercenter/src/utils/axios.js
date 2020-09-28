import axios from "axios"
import Config from "./config"

const api = axios.create({
  baseURL: Config.baseUrl,
  timeout: 300000,
});

// 添加请求拦截器
api.interceptors.request.use( config => {
  const userid = localStorage.getItem("userid") || ""
  if(userid){
    config.headers['user'] = userid
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const post = async (url,data)=>{
  let response = await api.post(url,data).catch(error => {
    errorHandler(error)
  })
  return responseHandler(response)
};

const get = async (url,data)=>{
    let response = await api.get(url,data).catch(error => {
      errorHandler(error)
    })
    return responseHandler(response)
};

const del = async (url,data)=>{
    const response = await api.request({url,data,method: 'delete'}).catch(error =>{
      errorHandler(error)
    })
    return responseHandler(response)

}

const put = async (url,data)=>{
    const response = await api.put(url,data).catch(error =>{
        errorHandler(error)
    })
    return responseHandler(response)

}

//公共处理错误的方法
const errorHandler = (error)=>{
    let errorMsg = (error.response && error.response.data && error.response.data.message) || '请求错误,请重试';

};

//公共的处理返回体的方法
const responseHandler = (response) =>{
    console.log('response===>',response)
    if(response && response.status === 200){
        if(!response.data){
            return {}
        }
        return response.data;
    }
    return null;
}



export {
    post,
    get,
    del,
    put
}