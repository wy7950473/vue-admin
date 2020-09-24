import router from "./index";
import { getToken } from "../utils/app";

/**
 * to : next page
 * from : previous page
 * next : 
 */
router.beforeEach((to,from,next) => {

    if (getToken()) {
        console.log('token exists');
    } else {
        console.log('token does not exist');
    }

    console.log(to);
    console.log(from);
    console.log(next);
    next();
  })