import rootReducer from "reducers";
import { compose, createStore } from "redux";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const finalCreateStore = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose
)(createStore)

export default function configureStore() {
    return finalCreateStore(rootReducer)
}