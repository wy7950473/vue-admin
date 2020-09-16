import axios from "axios";
import { Message } from  "element-ui";

// create axios,assignment variable service
// Front end to API address: http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';

const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});

// Add a request interceptor
service.interceptors.request.use(function (config) { 
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {

  // Do something with response data

    let data = response.data; 
    if (data.resCode != 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
});



// console.log(process.env.VUE_APP_ABC);

export default service;

/**
 * use export default,only one default can exist
 * when importing a file,you do not need to use "{}"
 */