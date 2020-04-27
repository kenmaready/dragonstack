import React, { Component, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from '../history';
import { logout, fetchAccountInfo } from '../redux/actions';

export class NavBar extends Component {

    componentDidMount() {
        this.props.fetchAccountInfo();
    }

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
                <span className="navbar-user-info">
                    <Navbar.Text className="navbar-user-item">User: {this.props.accountInfo.username}</Navbar.Text>
                    <Navbar.Text className="navbar-user-item">Balance: {this.props.accountInfo.balance} Crowns</Navbar.Text>
                </span>
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
    logout: PropTypes.func.isRequired,
    accountInfo: PropTypes.object.isRequired,
    fetchAccountInfo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    account: state.account,
    accountInfo: state.accountInfo
});

export default connect(mapStateToProps, { logout, fetchAccountInfo })(NavBar);
