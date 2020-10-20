import service from "@/utils/request";

export function GetRole(data = {}){
    return service.request({
        method:"post",
        url:"/role/",
        data
    });
}