/**
 * 过滤特殊字符
 */
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, "");
    }
    return rs;
}

/**
 * 验证邮箱格式
 */
export function validateEmail(email) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(email) ? true : false;
}

/**
 * 验证密码
 */
export function validPassword(password) {
    var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(password) ? true : false;
}

/**
 * 验证验证码
 */
export function validCode(code) {
    var reg = /^[a-zA-Z0-9]{6}$/;
    return !reg.test(code) ? true : false;
}