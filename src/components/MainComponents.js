import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Contact from './ContactComponent';
import DishDetail from './dishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { comment } from 'postcss-selector-parser';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        /> //is true (we have only one feature what is true  ---is the first element in the arrey :[0])
      );
    }

    const DishWithId = ({ match }) => {
      return (

        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}


        />
      )

    }

    return (
      <div>
        <Header />
        <Switch>

          <Route path='/home' component={HomePage} />

          <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />

          <Route exact path='/menu' render={() => <Menu dishes={this.props.dishes} />} />

          <Route path="/menu/:dishId" component={DishWithId} />

          <Route exact path='/contactus' component={Contact} />} />

              <Redirect to="/home" />

        </Switch>
        <Footer />
      </div>//from this dishes array, I'm going to select out one dish, that one particular dish is the one for which the dishId matches the selected dish here. 
      //filter function, if you recall from your knowledge of JavaScript this filter function will give the sub array of the dishes for which the sub-array contains are rather, constrained part of the array, or just the elements from the array, for which this property, the dishId matches selected dish.  
      //[0]=first item in arrey
    );

  }
}
//anything that doesn't match home or menu will be redirect to home for the moment. 


export default withRouter(connect(mapStateToProps)(Main));
