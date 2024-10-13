// src/redux/store.js

import { createStore, combineReducers } from 'redux';
import todosReducer from '../JS/Reducer'; // Adjust the path if needed

const rootReducer = combineReducers({
    todos: todosReducer,
});

const store = createStore(rootReducer);

export default store;
