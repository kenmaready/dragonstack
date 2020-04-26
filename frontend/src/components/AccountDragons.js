import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AccountDragonRow from './AccountDragonRow';
import { fetchAccountDragons } from '../redux/actions';


export class AccountDragons extends Component {
    componentDidMount() {
        this.props.fetchAccountDragons();
    }
    
    render() {
        const { dragons } = this.props.accountDragons;
        const renderDragons = dragons.map(dragon => {
            return (
            <div key={dragon.dragonId}>
                <AccountDragonRow dragon={dragon} />
            </div>
            )
        });
        
        return (
            <Fragment>
            <div className="header-space" />
            <div className="container">
                <h2>Your Dragons ...</h2>
                <div className='account-dragons-window'>
                            {renderDragons}
                </div> 
            </div>
            </Fragment>
        )
    }
}

AccountDragons.proptypes = {
    accountDragons: PropTypes.object.isRequired,
    fetchAccountDragons: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    accountDragons: state.accountDragons
});

export default connect(mapStateToProps, { fetchAccountDragons })(AccountDragons);
