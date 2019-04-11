import { createStore } from 'redux';
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
    const store = createStore( //takes 2 parameters(reducer and initialState)
        Reducer, // reducer
        initialState, // our initialState
    );

    return store;
}