import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import DishDetail from './dishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
      const HomePage = () => {
        return(
            <Home />
        );
      }
      return (
      <div>
<Header/>
<Switch>
  
              <Route path='/home' component={HomePage} />
              
            <Route exact path='/menu' render={() => <Menu dishes={this.state.dishes} />} />

              <Redirect to="/home" />  
              
          </Switch>
<Footer/>
        </div>//from this dishes array, I'm going to select out one dish, that one particular dish is the one for which the dishId matches the selected dish here. 
       //filter function, if you recall from your knowledge of JavaScript this filter function will give the sub array of the dishes for which the sub-array contains are rather, constrained part of the array, or just the elements from the array, for which this property, the dishId matches selected dish.  
   //[0]=first item in arrey
      );

  }
}
//anything that doesn't match home or menu will be redirect to home for the moment. 


export default Main;
