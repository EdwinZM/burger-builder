import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
         purchasing: false,
    }

    componentDidMount () {
       this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients)
        .map(key => {
            return ingredients[key]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        }else {
            this.props.onSetRedirect('/checkout');
            this.props.history.push('/auth');
        }
       
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }

    render () { 
       const disabledInfo = {
           ...this.props.ings
       }

       for (let key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0
       }
       let orderSummary = null;
    
       let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

       if (this.props.ings) {
        burger = (
            <Fragment>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    isDisabled={disabledInfo}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}
                    ordered={this.purchaseHandler}
                />
             </Fragment>
           );
           orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
       }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
   
};

const mapDispatchToProps = dispatch => {
    return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 