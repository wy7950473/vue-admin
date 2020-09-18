import Vue from "vue";
import SvgIcon from "./SvgIcon";

// define global component
Vue.component('test',SvgIcon);

// parsing files
/**
 * require.context : read all files in the specified directory
 * first parameter : directory
 * second parameter : traverse child directory
 * third paramter : define file traversal rules
 */
const req = require.context('./svg',false,/\.svg$/);
const requireAll = requireContext => {
    console.log(requireContext.keys());
    return requireContext.keys().map(requireContext);
}
requireAll(req);