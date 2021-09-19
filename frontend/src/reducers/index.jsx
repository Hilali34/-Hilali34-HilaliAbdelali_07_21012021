import {combineReducers} from "redux";
import postReducer from "./post.reducer";
import profileReducer from "./profile.reducer";
import commentReducer from "./comment.reducer";


export default combineReducers({
    postReducer,
    profileReducer,
    commentReducer,
});