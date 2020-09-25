/**
 * filter special characters
 */
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, "");
    }
    return rs;
}

/**
 * verify mailbox format
 */
export function validateEmail(email) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(email) ? true : false;
}

/**
 * verify password
 */
export function validPassword(password) {
    var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(password) ? true : false;
}

/**
 * verify verification code
 */
export function validCode(code) {
    var reg = /^[a-zA-Z0-9]{6}$/;
    return !reg.test(code) ? true : false;
}

/**
 * do not use export default,multiple exports can be declared at the same time
 * when importing a file,you need to use "{}"
 */