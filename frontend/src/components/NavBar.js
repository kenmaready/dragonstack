import React, { Component, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from '../history';
import { logout } from '../redux/actions';

export class NavBar extends Component {

        handleLogout = () => {
            this.props.logout();
            history.push('/');
        }

    render() {
        const showNavLinks = (
            <Fragment>
                <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>   
                <Nav.Link onClick={() => history.push('/account-dragons')}>My Dragons</Nav.Link>  
                <Nav.Link onClick={() => history.push('/public-dragons')}>Dragons For Sale</Nav.Link>  
                <Nav.Link onClick={this.handleLogout}>Log out</Nav.Link>
            </Fragment>
        );

        return (
            <div>
                <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
                    <Navbar.Brand >DragonStack</Navbar.Brand>
                    <Nav className='mr-auto'>
                    {this.props.account.loggedIn && showNavLinks}
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

NavBar.proptypes = {
    account: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    account: state.account
});

export default connect(mapStateToProps, { logout })(NavBar);
