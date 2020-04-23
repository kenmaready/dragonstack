import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signup, login } from '../redux/actions';

class AuthForm extends Component {
    state = {
        username: '',
        password: '',
        buttonClicked: false
    };

    get Error() {
        if (this.props.account.error) {
            console.log(this.props.account.error);
            return <div>{this.props.account.error}</div>
        }
    }

    login = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.login({ username, password });
    }

    signup = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.signup({ username, password });
    }

    updatePassword = event => {
        this.setState({ password: event.target.value });
    }

    updateUsername = event => {
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="info-window">
                    <div className='card'>
                        <div className='card-body'>
                            <div className='card-text'>
                                <h4>Login</h4>
                                <FormGroup>
                                    <FormControl
                                        type='text'
                                        value={this.state.username}
                                        placeholder='Your username'
                                        onChange={this.updateUsername}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControl
                                        type='password'
                                        value={this.state.password}
                                        placeholder='Your password'
                                        onChange={this.updatePassword}
                                    />
                                </FormGroup>
                                <div>
                                    <Button onClick={this.login}>Login</Button>
                                    <span> or </span>
                                    <Button onClick={this.signup}>Sign up</Button>
                                </div>
                                <br />
                                {this.state.buttonClicked && this.Error}
                            </div>
                        </div> 
                    </div>
                </div>                
            </div>
        );
    }
}

AuthForm.propTypes = {
    account: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    account: state.account
})

export default connect(mapStateToProps, { login, signup})(AuthForm);
