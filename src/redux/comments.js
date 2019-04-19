import * as ActionTypes from './ActionTypes';


export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMess: null, comments: action.payload };

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] };

        case ActionTypes.ADD_COMMENT://if the incoming action the type property of that action matches this, then this reducer function is supposed to do something to the state.

            var comment = action.payload;//payload was a JavaScript object which contained the various parts of the comment. 
            comment.id = state.commments.length;//comment is a JavaScript array, and so when I look at the length of the array, well, it contains a certain number of comments, the length of the array tells me how many comments they are
            //comment id here at this moment because I don't have any other place where I can generate the comment id in any way.
            comment.date = new Date().toISOString();
            return {...state,comments: state.comments.concat(comment)};//concat, what it does is it pushes in the new element into that array, but that will be a new object that will get created
        //how we can implement a reducer function which will not change, or mutate the state but instead creates a new copy of the state and then returns that value from the reducer function here. 
        default:
            return state;//if the state is undefined you give the initial, or the default value as dishes that we have just imported here, and then you're returning the state. So, the default return is dishes as it is. 
    }
};