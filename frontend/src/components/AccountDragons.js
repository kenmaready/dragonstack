import React, { Component } from 'react';
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
            <div className='account-dragons-window'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='card-text'>
                            <h4>Your Dragons ...</h4>
                            {renderDragons}
                        </div>
                    </div>
                </div>
            </div>
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
