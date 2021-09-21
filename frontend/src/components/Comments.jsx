import React from 'react';
import CommentCard from "./CommentCard";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

const Comments = () => {

    const comments = useSelector((state) => state.commentReducer)
    //console.log(comments)

    const commentsIsEmpty = _.isEmpty(comments);
    //console.log(commentsIsEmpty)

    return (
        <div>
            <ul>
                {!commentsIsEmpty && comments.map((comment) => (
                    <CommentCard comment={comment} key={comment.createdAt}/>

                ))}
            </ul>
        </div>
    );
};

export default Comments;