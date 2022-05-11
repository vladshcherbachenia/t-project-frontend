import { createStore } from 'redux'
import setUserReducer from "./reducers/setUserReducers";

const configureStore = () => {
    return createStore(setUserReducer);
}

export default configureStore;