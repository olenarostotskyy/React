import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {// we are setting up all the properties  within our state that can then be linked to our form. 
            firstname: '', // will be empty string
            lastname: '',
            telnum: '',
            email: '',
            agree: false, // Boolean called agree, which we will set to false
            contactType: 'Tel.',
            message: '',
            touched: { // form validation
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            }

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChanfe = this.handleInputChanfe.bind(this);
        this.handleBlur=this.handleBlur.bind(this);

    }

    //implement two different handlers that will take care of handling this Form here.
    handleInputChanfe(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value // any change that you make to any of the input in your form will immediately get reflected into the state.
        });
    }

    handleSubmit(event) {
        console.log("Current state is:" + JSON.stringify(this.state))
        alert("Current state is:" + JSON.stringify(this.state));
        event.preventDefault();// The default behavior when you submit a Form in any browser is to go to the next page. So, we will prevent that from happening. So, we will say the event.preventDefault behavior
    }

    handleBlur = (field) => () =>
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });

    validate(firstname, lastname, telnum, email) {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
        errors.firstname = 'First Name should be >= 3 characters';
    else if (this.state.touched.firstname && firstname.length > 10)
        errors.firstname = 'First Name should be <= 10 characters';

    if (this.state.touched.lastname && lastname.length < 3)
        errors.lastname = 'Last Name should be >= 3 characters';
    else if (this.state.touched.lastname && lastname.length > 10)
        errors.lastname = 'Last Name should be <= 10 characters';


        const reg = /^\d+$/; //regular expression => all the characters should be numbers
        if (this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = 'Tel. Number should contain only numbers';


        if (this.state.touched.email && email.split('').filter(x => x === '@').lenght !== 1) //at least one of the characters is an @ sign or not. 
            errors.email = 'Email should contain a @';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
       return (
       <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem> <Link to='/home'> Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                    <h5>Our Address</h5>
                    <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your Feedback</h3>
                </div>
                <div className="col-12 col-md-9" >
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}> First Name</Label>
                            <Col md={10}>
                                <Input type="text" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    //// So by tying this value to the control components state. Now this becomes a controlled form, so that any changes here will be reflected in the React components state here.
                                    value={this.state.firstname}
                                    valid={errors.firstname ===''}
                                    invalid={errors.firstname !==''}
                                    onBlur={this.handleBlur('firsname')}
                                    onChange={this.handleInputChanfe} />
                                    
                                <FormFeedback> {errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="lastname" md={2}> Last Name</Label>
                            <Col md={10}>
                                <Input type="text" id="lastname" name="lastname"
                                    placeholder="Last Name"
                                    value={this.state.lastname}
                                    valid={errors.lastname ===''}
                                    invalid={errors.lastname !==''}
                                    onBlur={this.handleBlur('lasname')}
                                    onChange={this.handleInputChanfe} />
                                <FormFeedback> {errors.lastname}</FormFeedback>

                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="telnum" md={2}> Contact Tel.</Label>
                            <Col md={10}>
                                <Input type="tel" id="telnum" name="telnum"
                                    placeholder="Tel. Number"
                                    value={this.state.telnum}
                                    valid={errors.telnum ===''}
                                    invalid={errors.telnum !==''}
                                    onBlur={this.handleBlur('telnum')}
                                    onChange={this.handleInputChanfe} />
                                <FormFeedback> {errors.telnum}</FormFeedback>

                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="email" md={2}> Email</Label>
                            <Col md={10}>
                                <Input type="email" id="email" name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    valid={errors.email ===''}
                                    invalid={errors.email !==''}
                                    onBlur={this.handleBlur('email')}
                                    onChange={this.handleInputChanfe} />
                                    <FormFeedback> {errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md={{ size: 6, offset: 2 }}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="agree"
                                            checked={this.state.agree}
                                            onChange={this.handleInputChanfe} /> {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{ size: 3, offset: 1 }}>
                                <Input type="select" name="contactType"
                                    value={this.state.contactType}
                                    onChange={this.handleInputChanfe} >
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="message" md={2}> Your Feedback</Label>
                            <Col md={10}>
                                <Input type="textarea" id="message" name="message"
                                    rows="12"
                                    value={this.state.message}
                                    onChange={this.handleInputChanfe} />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Send Feedback
                            </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div >
        </div >
       );
    }

}

export default Contact;