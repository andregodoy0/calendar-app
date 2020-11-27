import { applyMiddleware, compose, createStore } from "redux"
import thunk from 'redux-thunk'
import rootReducer from "reducers"

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose
    }
}

export default createStore(
    rootReducer, 
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f)
)