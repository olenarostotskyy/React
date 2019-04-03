import React from 'react';

import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';

function RenderMenuItem({dish,onClick}){
    return(
        <Card onClick={()=>onClick(dish.id)}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle>{dish.name}</CardTitle> 
           
        </CardBody>
    </Card>
    );
}

  //to show details  <CardText>{dish.description}</CardText> 
            

const Menu=(props)=>{// way of implementing a functional component
 
    const menu = props.dishes.map((dish) => {

            return (
                <div className="col-12 col-md-5 m-1">
                   <RenderMenuItem dish={dish} onClick={props.onClick} />
                </div>
            );
        });//m-1. Meaning, one unit margin all around in here. So by doing this, what I am doing to this div is, for the extra small to small screen sizes,
        console.log('Menu Components render is invoked');

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
}


    

export default Menu;