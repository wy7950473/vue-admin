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

export function UserActive(data){
    return service.request({
        method:"post",
        url:"/user/actives/",
        data
    });
}

export function UserEdit(data){
    return service.request({
        method:"post",
        url:"/user/edit/",
        data
    });
}

export function GetSystem(data){
    return service.request({
        method:"post",
        url:"/system/",
        data
    });
}

export function getUserRoles(data = {}){
    return service.request({
        method:"post",
        url:"/userRole/",
        data
    });
}
