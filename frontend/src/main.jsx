import React from 'react'
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




const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getPosts());
store.dispatch(getComments());


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
