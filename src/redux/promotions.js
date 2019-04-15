import { PROMOTIONS } from '../shared/promotions';

export const Promotions=(state=PROMOTIONS, action) => {
    switch (action.type) {
        default:
          return state;//if the state is undefined you give the initial, or the default value as dishes that we have just imported here, and then you're returning the state. So, the default return is dishes as it is. 
      }
};