import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';

import MatingOptions from './MatingOptions';
import { buyDragon } from '../redux/actions';


export class PublicDragonRow extends Component {
    state = {   
        onHover: false,
        displayMatingOptions: false
    }
    
    handleBuy = () => {
        this.props.buyDragon({ dragonId: this.props.dragon.dragonId, saleValue: this.props.dragon.saleValue });
    }

    handleMouseEnter = () => {
        this.setState({ onHover: true });
    }

    handleMouseLeave = () => {
        this.setState({ onHover: false, displayMatingOptions: false });
    }

    toggleDisplayMatingOptions = () => {
        this.setState({ displayMatingOptions: !this.state.displayMatingOptions });
    }

    render() {
        const { nickname, birthdate, traits, saleValue, sireValue, dragonId, isPublic } = this.props.dragon;
        const renderTraits = traits.map((trait, ix) => {
            return ( 
            <span key={`${dragonId}.${ix}`}>
                {(ix === (traits.length - 1)) ? `${trait.traitValue}.`: `${trait.traitValue}, `} 
            </span>
            )
        });

        return (
            <div>
                {isPublic &&
                        <div className="dragon-row" onMouseEnter={this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave} >
                        Dragon {dragonId}: &nbsp;
                        {nickname ? nickname : "Unnamed Dragon"} |&nbsp; 
                        Born {moment(birthdate).format("MMMM Do, YYYY")} |&nbsp;
                        Description: {renderTraits} |&nbsp;
                        Price: {saleValue} Crowns |&nbsp;
                        Siring Fee: {sireValue} Crowns
                        {this.state.onHover && (
                        <span>
                            <Button 
                                size='sm' 
                                variant='primary' 
                                className="buy-button"
                                onClick={this.handleBuy}>
                                Buy
                            </Button>
                            <Button 
                                size='sm' 
                                variant='primary' 
                                className="buy-button"
                                onClick={this.toggleDisplayMatingOptions}>
                                Hire
                            </Button>
                        </span>)
                        }
                        {(this.state.onHover && this.state.displayMatingOptions) ? (
                            <MatingOptions fatherDragonId={dragonId} />
                        ) : (
                            <div></div>
                        )}
                    </div>
                }
            </div>
        )
    }
}

PublicDragonRow.proptypes = {
    dragon: PropTypes.object.isRequired,
    buyDragon: PropTypes.func.isRequired
};

export default connect(null, { buyDragon })(PublicDragonRow);
