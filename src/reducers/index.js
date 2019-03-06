import { combineReducers } from "redux";

import user from "./user";
import clipboard from "./clipboard";
import shoppingList from "./shopping-list";


export default combineReducers({
    user,
    clipboard,
    shoppingList,
});
