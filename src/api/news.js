import service from "@/utils/request";

// add info
export function AddInfo(data) {
    return service.request({
        method:"post",
        url:"/news/add/",
        data
    });
};

// get info
export function GetList(data) {
    return service.request({
        method:"post",
        url:"/news/getList/",
        data
    });
}

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

// delete category
export function DeleteCategory(data) {
    return service.request({
        method:"post",
        url:"/news/deleteCategory/",
        data
    });
}

// edit category
export function EditCategory(data) {
    return service.request({
        method:"post",
        url:"/news/editCategory/",
        data
    });
}