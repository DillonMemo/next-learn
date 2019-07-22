import { combineReducers } from 'redux';
import { reducer as todo } from './todo';

const rootReducer = combineReducers({
    todo
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;