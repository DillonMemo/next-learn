import { Dispatch } from 'react';

/**
 * Typescript with Redux
 */

// Types
export interface Todo {
    index: number;
    text: string;
    complete: boolean;
    update: boolean;
}

// Actions
export const ADD = "ADD_TODO";
export const SET = "SET_TODO";
export const COM = "COM_TODO";
export const DEL = "DEL_TODO";
export const UPD = "UPD_TODO";

export interface AddTodoAction {
    type: typeof ADD;
    todo: Todo;
}
export interface SetTodoAction {
    type: typeof SET;
    todos: Todo[];
}
export interface ComTodoAction {
    type: typeof COM;
    index: number;
}
export interface DelTodoAction {
    type: typeof DEL;
    index: number;
}
export interface UpdTodoAction {
    type: typeof UPD;
    todo: Todo;
}

export type TodoActionTypes = | AddTodoAction | SetTodoAction | ComTodoAction | DelTodoAction | UpdTodoAction;

export type AppActions = TodoActionTypes;

export const addTodo = (todo: Todo): AppActions => ({
    type: ADD,
    todo
});

export const setTodo = (todos: Todo[]): AppActions => ({
    type: SET,
    todos
});

export const comTodo = (index: number): AppActions => ({
    type: COM,
    index
});

export const delTodo = (index: number): AppActions => ({
    type: DEL,
    index
});

export const updTodo = (todo: Todo): AppActions => ({
    type: UPD,
    todo
});

// reducer
const todoReducerDefaultState: Todo[] = [];

export const reducer = (state = todoReducerDefaultState, action: TodoActionTypes): Todo[] => {
    switch (action.type) {
        case ADD:
            console.log("reducer ADD : ", action.todo);
            return [...state, action.todo];
        case SET:
            console.log("reducer SET : ", action.todos);
            return action.todos;
        case COM:
            state[action.index].complete = !state[action.index].complete;
            console.log("reducer COM : ", state[action.index]);
            return [...state];
        case DEL:
            state.splice(action.index, 1);
            console.log("reducer DEL : ", state);
            return [...state];
        case UPD:
            console.log("reducer UPD : ", state);
            return state.map(todo => {
                if (todo.text === action.todo.text) {
                    debugger;
                    todo.update = !todo.update
                    return {
                        ...todo,
                        ...action.todo
                    }
                } else {
                    debugger;
                    return todo;
                }
            });
        default:
            return state;
    }
};