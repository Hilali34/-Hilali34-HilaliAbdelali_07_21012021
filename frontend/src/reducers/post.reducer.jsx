import {ADD_POST, DELETE_POST, EDIT_POST, GET_POSTS} from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action){
    switch (action.type){
        case GET_POSTS:
            return action.payload;
        case ADD_POST:
            return [action.payload, ...state];
        case EDIT_POST:
            return state.map((post) => {
                //console.log(post.id)
               // console.log(action.payload.postId)
               // console.log(post.id === action.payload.postId)

                if (post.id === action.payload.postId) {
                return {
                    ...post,
                    content: action.payload.content,
                    title: action.payload.title,
                };
            } else return post;
        });
        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postId);
        default:
            return state;
    }
}