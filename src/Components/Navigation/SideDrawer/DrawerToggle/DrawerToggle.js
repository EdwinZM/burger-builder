import React, { Fragment } from 'react';
import classes from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
    return (
        <Fragment>
            <div className={classes.DrawerToggle} onClick={props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Fragment>
    );
};

export default DrawerToggle;