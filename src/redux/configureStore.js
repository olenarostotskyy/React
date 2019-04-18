import { createStore, combineReducers,applyMiddleware  } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';




export const ConfigureStore = () => {
    const store = createStore( 
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback//initial feedback is that we can reset the form to its initial state after submitting the form. So, in that case, recall that even if you reload your component your form state will remain as such.
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}