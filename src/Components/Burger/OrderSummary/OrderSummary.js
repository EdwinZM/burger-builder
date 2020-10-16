import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[Order Summary} did update..')
    }
   
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return (
            <li key={key}>
                <span style={{testTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
            </li>);
        })
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
        <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Fragment>
        );
    }
    
};

export default OrderSummary;