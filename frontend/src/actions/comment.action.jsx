import axios from "axios";
import _ from "lodash";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = () => {

    const postId = document.URL.split("commentaire/")[1];
    const token = window.localStorage.getItem("userToken").replace(/"/g, '');
    const tokenIsEmpty = _.isEmpty(token);

    return (dispatch) => {
        return axios({
            method: "GET",
            url: `http://localhost:4200/groupomania/comment/all/${postId}`,

            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: postId
            }
        }, [])
            .then((res) => {
                    !tokenIsEmpty && dispatch({type: GET_COMMENTS, payload: res.data.comment})
                }
            )
            .catch((error) => console.log(error))
    }
}

export const addComment = (data, token, postId) => {
    console.log(data);

    return (dispatch) => {
        return axios({
            method: "POST",
            url: `http://localhost:4200/groupomania/comment/${postId}`,
            data,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: postId
            }

        }, [])
            .then((res) => {
                    console.log(res.data.comment)
                    dispatch({type: ADD_COMMENT, payload: res.data.comment})
                }
            )
            .catch((error) => console.log(error))
    };
};

export const editComment = (data, commentId, token) => {
    console.log(data)

    return (dispatch) => {
        return axios({
            method: "PUT",
            url: `http://localhost:4200/groupomania/comment/${commentId}`,
            data,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: commentId
            }

        }, [])
            .then((res) => {
                    console.log(res.data.comment.content)
                    dispatch({type: EDIT_COMMENT, payload: {content: res.data.comment.content, commentId}});

                }
            )
            .catch((error) => console.log(error))
    };
};


export const deleteComment = (commentId, token) => {
    console.log(commentId);
    console.log(token);

    return (dispatch) => {
        return axios({
            method: "DELETE",
            url: `http://localhost:4200/groupomania/comment/${commentId}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: commentId
            }

        }, [])
            .then((res) => {
                    console.log(res)
                    dispatch({type: DELETE_COMMENT, payload: {commentId}});
                }
            )
            .catch((error) => console.log(error))
    };
};
