import { combineReducers } from 'redux';
import { reducer as todo } from './todo';
import { reducer as qr } from './reader';

const rootReducer = combineReducers({
    todo,
    qr
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;