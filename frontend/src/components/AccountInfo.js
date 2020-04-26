import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAccountInfo } from '../redux/actions';


export class AccountInfo extends Component {
    componentDidMount() {
        this.props.fetchAccountInfo();
    }

    render() {
        return (
            <div className='card'>
                <div className='card-body'> 
                    <h3>Account:</h3>
                    <h5>Username: {this.props.accountInfo.username}</h5>
                    <h5>Balance: {this.props.accountInfo.balance}</h5>
                </div>
            </div>
        )
    }
}

AccountInfo.proptypes = {
    AccountInfo: PropTypes.object.isRequired,
    fetchAccountInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accountInfo: state.accountInfo
});

export default connect(mapStateToProps, { fetchAccountInfo })(AccountInfo)
