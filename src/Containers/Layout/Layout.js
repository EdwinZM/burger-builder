import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state= {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState =>{
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render () {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer  
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
                <main className= {classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
     
};


export default Layout;
