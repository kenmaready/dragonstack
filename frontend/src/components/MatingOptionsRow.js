import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';

import history from '../history';
import { mateDragons } from '../redux/actions';


class MatingOptionsRow extends Component {
    state = {   
        onHover: false
    }
    
    handleHire = () => {
        this.props.mateDragons({ motherDragonId: this.props.dragon.dragonId, fatherDragonId: this.props.fatherDragonId });
    }

    handleMouseEnter = () => {
        this.setState({ onHover: true });
    }

    handleMouseLeave = () => {
        this.setState({ onHover: false });
    }

    render() {
        console.log(this.props.dragon);
        const { dragonId, birthdate, nickname, traits } = this.props.dragon;
        const renderTraits = traits.map((trait, ix) => {
            return ( 
            <span key={`${dragonId}.${ix}`}>
                {(ix === (traits.length - 1)) ? `${trait.traitValue}.`: `${trait.traitValue}, `} 
            </span>
            )
        });

        return (
            <div className="dragon-row mating-row" onClick={this.handleHire}>
                Dragon {dragonId} | Name: {nickname? nickname : "unnamed"} | Birthdate: {moment(birthdate).format("MMMM Do, YYYY")} | Description: {renderTraits}
            </div>
        )
    }
}

export default connect(null, { mateDragons })(MatingOptionsRow);
