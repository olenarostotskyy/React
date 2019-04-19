import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Row, FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';




function RenderDish({ dish }) {
    if (dish != null) {//check if dish not equal to null. So, obviously if the dish is not null, only then I will render the dish. Otherwise, I will simply return a div, an empty div here. S
        return (
            //card component
            <div className="col-sm-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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


function RenderComments({ comments, addComment, dishId }) {
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
                <React.Fragment>

                    <CommentForm dishId={dishId} addComment={addComment} />
                </React.Fragment>



            </div>


        );

    else {
        return (
            <div>

            </div>
        );
    }

}


const required = (val) => val && val.length;// cheked is the value is greater than 0.
const maxLength = (len) => (val) => !(val) || (val.length <= len);//receives a length as a parameter and also receives the value.  So this is the maximum length. So this enables us to check and make sure that the length of the value entered in the input box is below a certain value.
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false


        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return (
            <React.Fragment>
                <Button outline color="secondary" onClick={this.toggleModal}>Submit comment</Button>{' '}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12 col-md-12" >
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating"
                                            placeholder="Rating"
                                            className="form-control">

                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>

                                        </Control.select>

                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder=" Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-denger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 charecters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="message" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            placeholder="Your comment"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 12 }}>
                                        <Button type="submit" color="primary">
                                            Submit
                                    </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if (props.dish != null)
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
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    else
        return (
            <div> </div>
        )
}



export default DishDetail;