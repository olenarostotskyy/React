import React, { Component } from 'react';
import Menu from './MenuComponents';
import DishDetail from './dishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null //new property/ var
    }
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});// when we need to change the state, we need to use the this.setState function call.
}

  render() {
    return (
      <div>
<Header/>
<Menu dishes={this.state.dishes} //onClick when it is invoked, will pass the dishId parameter, which will come in as the parameter here for the onDishselect
onClick={(dishId) => this.onDishSelect(dishId)}/> 


<DishDetail //For each dish, what I'm going to do, is to check dishId is this the same as this state selected dish
dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]} />
<Footer/>
        </div>//from this dishes array, I'm going to select out one dish, that one particular dish is the one for which the dishId matches the selected dish here. 
       //filter function, if you recall from your knowledge of JavaScript this filter function will give the sub array of the dishes for which the sub-array contains are rather, constrained part of the array, or just the elements from the array, for which this property, the dishId matches selected dish.  
   //[0]=first item in arrey
       );

  }
}

export default Main;
