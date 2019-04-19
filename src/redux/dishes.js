import * as ActionTypes from './ActionTypes';

export const Dishes=(state={
    isLoading: true,
    errMess: null,
    dishes:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

            case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}//sprint operator--it will take the current value of the state and then whatever else that I passing in after this will be applied as modifications to the state. So again, the state itself will not be mutated, instead, I take the state, I create a new object from the original state and then make some changes to that object and then return that object.

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: []};

        
    
        default:
          return state;//if the state is undefined you give the initial, or the default value as dishes that we have just imported here, and then you're returning the state. So, the default return is dishes as it is. 
      }
};