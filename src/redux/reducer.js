import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

////this is the initial configuration for my state
export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};
//the ES6 way of defining functions where you can specify the default value for a parameter, and then I'll say, state equals to initialState. 
export const Reducer = (state = initialState, action) => {
    return state;
};