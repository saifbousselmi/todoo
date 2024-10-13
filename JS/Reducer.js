// src/JS/Reducer.js
import { ADD_TASK, DELETE_TASK, DONE_TASK, EDIT_TASK } from './ActionsTypes';

const initialState = {
    todos: [
        { id: 1, title: "Volunteer for a Local Cause", completed: false },
        { id: 2, title: "Create a Personalized Gif", completed: false },
        { id: 3, title: "Plan a Day of Adventure", completed: true },
        { id: 4, title: "Host a Themed Dinner Night", completed: true },
        { id: 5, title: "Write a Letter to Your Future Self", completed: false },
    ]
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                todos: [...state.todos, { id: Date.now(), title: action.payload.title, completed: false }],
            };
        case DELETE_TASK:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case DONE_TASK:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
                ),
            };
        case EDIT_TASK:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
                ),
            };
        default:
            return state;
    }
};

export default todoReducer;
