import service from "@/utils/request";

// add first level classification
export function addFirstCategory(data){
    return service.request({
        method:"post",
        url:"/news/addFirstCategory/",
        data
    });
}

// get category info
export function getCategoryInfo(data){
    return service.request({
        method:"post",
        url:"/news/getCategory/",
        data
    })
}