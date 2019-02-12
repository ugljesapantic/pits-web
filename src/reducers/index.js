import { combineReducers } from "redux";

import user from "./user";
import clipboard from "./clipboard";

export default combineReducers({
    user,
    clipboard
});
