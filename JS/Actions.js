// src/JS/Actions.js
import { ADD_TASK, DELETE_TASK, DONE_TASK, EDIT_TASK } from './ActionsTypes';

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: id,
});

export const doneTask = (task) => ({
    type: DONE_TASK,
    payload: task,
});

export const editTask = (task) => ({
    type: EDIT_TASK,
    payload: task,
});
