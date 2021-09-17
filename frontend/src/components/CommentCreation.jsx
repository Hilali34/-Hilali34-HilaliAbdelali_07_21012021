import React, {useState} from 'react';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CommentCreation = () => {

    const [content, setContent] = useState("");

    const postId = document.URL.split("commentaire/")[1];
    const token = window.localStorage.getItem("userToken").replace(/"/g,'')
    //console.log(token)

    const handleCommentCreation = async (e) => {
        e.preventDefault()

        await axios({
            method: "POST",
            url:`http://localhost:4200/groupomania/comment/${postId}`,
            data: {
                content,
            },
            headers: {
                'authorization': `Bearer ${token}`
            },
            params:{
                id: postId
            }


        },[])

            .then((res)=>{
                window.location.reload(false);
                window.alert("Le commentaire a été ajouter avec succès !");
                //window.location = "/connexion";

            })
            .catch((error)=>{
                console.log(error);
            })

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