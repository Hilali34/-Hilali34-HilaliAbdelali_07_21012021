import React, {useContext, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

// redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { getPosts } from "./actions/post.action";
import {getComments} from "./actions/comment.action";
import {getProfile} from "./actions/profile.action";
import _ from "lodash";

const token = window.localStorage.getItem("userToken");

const tokenIsEmpty = _.isEmpty(token);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

console.log(tokenIsEmpty)

if (!tokenIsEmpty){
    store.dispatch(getPosts());
    store.dispatch(getComments());
    store.dispatch(getProfile());
}





ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
