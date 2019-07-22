import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Todo, ADD, SET, COM, DEL, UPD, AppActions } from '../reducers/todo';
import { AppState } from '../reducers/index';

// Set Types
type FormElem = React.FormEvent<HTMLFormElement>
type ChangeElem = React.ChangeEvent<HTMLInputElement>

const todoPage:React.FunctionComponent = () => {
    const dispatch = useDispatch<AppActions>();
    const todos = useSelector(state => state.todo);
    const [index, setIndex] = useState<number>(0);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        dispatch({
            type: SET,
            todos: [
                {
                    index: 1,
                    text: 'test1',
                    complete: false,
                    update: false
                },
                {
                    index: 2,
                    text: 'test2',
                    complete: false,
                    update: false
                },
                {
                    index: 3,
                    text: 'test3',
                    complete: false,
                    update: false
                }
            ]
        })
    }, []);

    const handleSubmit = (e: FormElem): void => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    }

    const handleChange = (e: ChangeElem, todo: Todo): void => {

        todo.text = e.currentTarget.value;
    }

    const addTodo = (text: string) => {
        console.log(...todos, { index: (todos[todos.length - 1].index + 1),text, complete: false, update: false });
        const newTodo = { 
             text, complete: false, update: false };

        dispatch({
            type: ADD,
            todo: newTodo
        })
    }

    const completeTodo = (index: number): void => {
        console.log("complete : ", todos[index], index);
        dispatch({
            type: COM,
            index: index
        });
    }

    const deleteTodo = (index: number): void => {
        console.log("delete : ", todos[index]);
        dispatch({
            type: DEL,
            index: index
        });
    }

    const updateTodo = (todo: Todo): void => {
        console.log("update : ", todos);
        dispatch({
            type: UPD,
            todo
        });
    }

    return (
        <Fragment>
            <h1>CRUD free render Temp</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
                <button type="submit">Add</button>
            </form>
            <section>
                {todos.map((todo: Todo, index: number) => {
                    //console.log("maps : ", todo);
                    return (
                        <Fragment key={todo.index}>
                            {
                                todo.update ?
                                    <div>
                                        <input type="text" value={todo.text} onChange={(e) => handleChange(e, todo)} />
                                    </div>
                                    :
                                    <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.text}</div>
                            }
                            <button type="button" onClick={() => completeTodo(index)}>
                                {' '}{todo.complete ? 'Incomplete' : 'Complete'}{' '}
                            </button>
                            <button type="button" onClick={() => updateTodo(todo)}>{todo.update ? 'update complete' : 'update'}</button>
                            <button type="button" onClick={() => deleteTodo(index)}>&times;</button>
                        </Fragment>
                    );
                })}
            </section>
        </Fragment>
    );
};

export default todoPage;
