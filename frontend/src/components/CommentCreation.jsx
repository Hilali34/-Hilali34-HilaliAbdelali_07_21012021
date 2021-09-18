import React, {useState} from 'react';
import {addComment} from "../actions/comment.action";
import {useDispatch} from "react-redux";

const CommentCreation = () => {

    const dispatch = useDispatch()
    const [content, setContent] = useState("");

    const postId = document.URL.split("commentaire/")[1];
    const token = window.localStorage.getItem("userToken").replace(/"/g,'')
    //console.log(token)

    const handleCommentCreation = async (e) => {
        e.preventDefault()

        const data = {
            content
        };

        await dispatch(addComment(data,token,postId))
        setContent("");

    };

    return (
        <div>
            <form onSubmit={handleCommentCreation}>

                <div className="form-group">
                    <label htmlFor="floatingInput"> </label>
                    <label className="sr-only" htmlFor="message">Publication</label>
                    <textarea className="form-control" id="message" rows="3"
                              placeholder="Exprimez-vous!"
                              value={content}  required onChange={e => setContent(e.target.value)}
                    />
                </div>
                <div className="btn-toolbar justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary">Commenter</button>
                </div>
            </form>

        </div>
    );
};

export default CommentCreation;