import * as ActionTypes from './ActionTypes';

export const Leaders=(state={
    isLoading: true,
    errMess: null,
    leaders:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

            case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}//sprint operator--it will take the current value of the state and then whatever else that I passing in after this will be applied as modifications to the state. So again, the state itself will not be mutated, instead, I take the state, I create a new object from the original state and then make some changes to that object and then return that object.

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaders: []};

        
    
        default:
          return state;//if the state is undefined you give the initial, or the default value as dishes that we have just imported here, and then you're returning the state. So, the default return is dishes as it is. 
      }
};