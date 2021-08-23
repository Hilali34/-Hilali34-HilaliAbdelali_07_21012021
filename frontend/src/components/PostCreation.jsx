import React from 'react';

const PostCreation = () => {
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
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade active show" id="posts" role="tabpanel"
                             aria-labelledby="posts-tab">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="message">Publication</label>
                                <textarea className="form-control" id="message" rows="3"
                                          placeholder="Exprimez-vous!">

                                </textarea>
                            </div>

                        </div>

                    </div>
                    <div className="btn-toolbar justify-content-between mt-3">
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary">Publier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCreation;
