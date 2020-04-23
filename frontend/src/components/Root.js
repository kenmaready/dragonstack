import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import AuthForm from './AuthForm';

class Root extends Component {

    render() {
        return (
            this.props.account.loggedIn ? <Home /> : <AuthForm />
        )
    }
};

Root.proptypes = {
    account: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    account: state.account
});

export default connect(mapStateToProps)(Root);