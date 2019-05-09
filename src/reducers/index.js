import { combineReducers } from "redux";

import user from "./user";
import clipboard from "./clipboard";
import shoppingList from "./shopping-list";
import dairy from "./dairy";


export default combineReducers({
    user,
    clipboard,
    shoppingList,
    dairy
});
