import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Contact from './ContactComponent';
import DishDetail from './dishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { comment } from 'postcss-selector-parser';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionsCreators';
import { dispatch } from 'rxjs/internal/observable/range';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  postFeedback: (feedback) => { dispatch(postFeedback(feedback)) }
});


class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {//lifecycle method
    this.props.fetchDishes();//whatever we include in this lifecycle method component will bound will be called or will be executed just after this component gets mounted into the view of my application.
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leaders={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}


        /> //is true (we have only one feature what is true  ---is the first element in the arrey :[0])
      );
    }

    const DishWithId = ({ match }) => {
      return (

        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )

    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>

              <Route path='/home' component={HomePage} />

              <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />

              <Route exact path='/menu' render={() => <Menu dishes={this.props.dishes} />} />

              <Route path="/menu/:dishId" component={DishWithId} />

              <Route exact path='/contactus' component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>} />

              <Redirect to="/home" />

            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>//from this dishes array, I'm going to select out one dish, that one particular dish is the one for which the dishId matches the selected dish here. 
      //filter function, if you recall from your knowledge of JavaScript this filter function will give the sub array of the dishes for which the sub-array contains are rather, constrained part of the array, or just the elements from the array, for which this property, the dishId matches selected dish.  
      //[0]=first item in arrey
    );

  }
}
//anything that doesn't match home or menu will be redirect to home for the moment. 


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
