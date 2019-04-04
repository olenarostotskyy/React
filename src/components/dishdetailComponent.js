import React from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDish({ dish }) {
    if (dish != null) {//check if dish not equal to null. So, obviously if the dish is not null, only then I will render the dish. Otherwise, I will simply return a div, an empty div here. S
        return (
            //card component
            <div className="col-sm-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else
        return (
            <div>

            </div> //empty div
        );
}


function RenderComments({ comments }) {
    if (comments != null)
        return (
            <div className="col-sm-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                                <p>--{comment.comment}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );

    else {
        return (
            <div>

            </div>
        );
    }
}


const DishDetail = (props) => {

    if (props.dish != null)
        return (
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                       
                        <BreadcrumbItem> <Link to='/menu'> Menu</Link></BreadcrumbItem>

                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    else
        return (
            <div> </div>
        )
}

export default DishDetail;