import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Post = () => {
    return (
        <div className="container col-md-8 mb-4" >
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                                <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt=""/>
                            </div>
                            <div className="ml-2">
                                <div className="h5 m-0">@LeeCross</div>
                                <div className="h7 text-muted">Miracles Lee Cross</div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="card-body">
                    <div className="text-muted h7 mb-2"><FontAwesomeIcon icon="clock-o" />10 min ago</div>
                    <a className="card-link" href="#">
                        <h5 className="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
                    </a>

                    <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae nulla rem eos ipsa
                        praesentium esse magnam nemo dolor
                        sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste voluptates.
                    </p>
                </div>
                <div className="card-footer">
                    <a href="#" className="card-link"><FontAwesomeIcon icon="heart" /> Like</a>
                    <a href="#" className="card-link"><FontAwesomeIcon icon="comment" /> Comment</a>

                </div>
            </div>
        </div>
    );
};

export default Post;
