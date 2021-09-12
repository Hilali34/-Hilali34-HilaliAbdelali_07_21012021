import React, {useState} from 'react';
import axios from "axios";

const PostCreation = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const token = window.localStorage.getItem("userToken").replace(/"/g,'')
    console.log(token)

    const handlePostCreation = async (e) => {
        e.preventDefault()

        await axios({
            method: "POST",
            url:"http://localhost:4200/groupomania/post/",
            data: {
                title,
                content,
            },
            headers: {
                'authorization': `Bearer ${token}`
            }

        },[])
            .then((res)=>{
                    window.alert("Le post a été créé avec succès !");
                    //window.location = "/connexion";

            })
            .catch((error)=>{
                console.log(error);
            })

    };

    return (
        <div className="p-4 container col-md-6">
            <div className="card gedf-card  border secondary">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="posts-tab" data-toggle="tab" href="#posts"
                               role="tab" aria-controls="posts" aria-selected="true"> Votre Article</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">

                    <form onSubmit={handlePostCreation}>

                        <div className="form-group">
                            <label htmlFor="floatingInput"> </label>
                            <input type="text" className="form-control" id="floatingInput"

                                   placeholder="Le titre de votre publication"
                                   value={title}  required onChange={e => setTitle(e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="floatingInput"> </label>
                            <label className="sr-only" htmlFor="message">Publication</label>
                            <textarea className="form-control" id="message" rows="3"
                                      placeholder="Exprimez-vous!"
                                      value={content}  required onChange={e => setContent(e.target.value)}
                            />
                        </div>
                        <div className="btn-toolbar justify-content-between mt-3">
                            <button type="submit" className="btn btn-primary">Publier</button>
                         </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default PostCreation;
