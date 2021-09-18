import {combineReducers} from "redux";
import postReducer from "./post.reducer";
import commentReducer from "./comment.reducer";

export default combineReducers({
    postReducer,
    commentReducer,
});