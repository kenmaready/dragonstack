import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import Generation from './Generation';
import Dragon from './Dragon';


class Home extends Component {
    render () {
        return (
            <Fragment>
                <div className='logout-button'>
                </div>
                <div className="info-window">
                    <Generation />
                    <hr />
                    <Dragon />
                </div>
            </Fragment>
        );
    }
}


export default Home;
