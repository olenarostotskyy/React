import React from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderMenuItem({ dish, onClick }) {
    return (
        //link to, now the specific dish itself has its dish ID. This dish ID is the one that I want to pass. But then this link allows me to only specify the URL to which I navigate. Now, how do I make use of this dish ID? This is where I can use back quotes.
        // So a back quote means whatever is enclosed inside here, so if I put a JavaScript value there that could be evaluated and then replace that value there. 
        // what happens here is that for each specific dish, the corresponding dish ID value is evaluated here, and this will be substituted by the dish ID values.
        <Card>
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>

                </CardBody>
            </Link>
        </Card>
    );
}

//to show details  <CardText>{dish.description}</CardText> 


const Menu = (props) => {// way of implementing a functional component

    const menu = props.dishes.dishes.map((dish) => {

        return (
            <div className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });//m-1. Meaning, one unit margin all around in here. So by doing this, what I am doing to this div is, for the extra small to small screen sizes,

    console.log('Menu Components render is invoked');

    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to='/home'> Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                    </div>
                </div>
                <div className="row">
                    {menu} 
                </div>
            </div>
        );
}




export default Menu;