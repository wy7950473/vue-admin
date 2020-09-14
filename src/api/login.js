import service from "@/utils/request";

// get verification code
 export function GetSms(data){
     return service.request({
         method:"post",
         url:"/getSms/",
         data:data
     });
 }

 // 获取用户角色

 // 登录

 // 注册
 export function Register(data){
     return service.request({
        method:"post",
        url:"/register/",
        data
     });
 }