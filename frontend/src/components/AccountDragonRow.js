import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export class AccountDragonRow extends Component {
    render() {
        const { nickname, birthdate, traits, dragonId } = this.props.dragon;
        const renderTraits = traits.map((trait, ix) => {
            return <span key={`${dragonId}.${ix}`}>{(ix === (traits.length - 1)) ? `${trait.traitValue}.` : `${trait.traitValue}, `} </span>
        });

        return (
            <div>
            Dragon {dragonId}: {nickname ? nickname: "unnamed"}, {moment(birthdate).format("MMMM Do, YYYY")}, {renderTraits}
            </div>
        )
    }
}

AccountDragonRow.proptypes = {
    dragon: PropTypes.object.isRequired
};

export default AccountDragonRow;
