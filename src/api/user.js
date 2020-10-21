import service from "@/utils/request";

export function GetRole(data = {}){
    return service.request({
        method:"post",
        url:"/role/",
        data
    });
}

export function AddUser(data){
    return service.request({
        method:"post",
        url:"/user/add/",
        data
    });
}

export function DeleteUser(data){
    return service.request({
        method:"post",
        url:"/user/delete/",
        data
    });
}