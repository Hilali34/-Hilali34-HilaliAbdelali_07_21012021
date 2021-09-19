import {GET_COMMENTS,ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT} from "../actions/comment.action";

const initialState = {};

export default function commentReducer(state = initialState, action){
    switch (action.type){
        case GET_COMMENTS:
            if(action.payload){
                return action.payload;
            }else return "";
        case ADD_COMMENT:
            return [action.payload, ...state];
        case EDIT_COMMENT:
            return state.map((comment) => {
               // console.log(comment.id)
                //console.log(action.payload.commentId)
                if (comment.id === action.payload.commentId) {
                    console.log(comment.id === action.payload.commentId)
                    return {
                        ...comment,
                        content: action.payload.content,
                    };
                } else return comment;
            });
        case DELETE_COMMENT:
            return state.filter((comment) => comment.id !== action.payload.commentId);
        default:
            return state;
    }
}