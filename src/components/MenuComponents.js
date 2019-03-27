import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null //the selected.Dish is null initially so which means that I haven't selected any dish, whenever I click on any one of these dishes, then I will make the dish information become equal to the selected.
        }
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish});// when we need to change the state, we need to use the this.setState function call.
    }

    renderDish(dish) {
        if (dish != null)//check if dish not equal to null. So, obviously if the dish is not null, only then I will render the dish. Otherwise, I will simply return a div, an empty div here. S
            return(
                //card cvomponent
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>//empty div
            );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });//m-1. Meaning, one unit margin all around in here. So by doing this, what I am doing to this div is, for the extra small to small screen sizes,

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                 
                    {this.renderDish(this.state.selectedDish)}
               
                </div>
            </div>
        );
    }
}

export default Menu;