import cookie from "cookie_js";

const adminToken = 'admin_token';
const USERNAME = 'username';

export function getToken(){
    return cookie.get(adminToken);
}

export function setToken(token){
    return cookie.set(adminToken,token);
}

export function removeToken(){
    return cookie.remove(adminToken);
}

export function setUsername(username){
    return cookie.set(USERNAME,username);
}

export function getUsername(){
    return cookie.get(USERNAME);
}

export function removeUsername(){
    return cookie.remove(USERNAME);
}