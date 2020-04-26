import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';

import { buyDragon } from '../redux/actions';


export class PublicDragonRow extends Component {
    state = {   
        onHover: false
    }
    
    handleBuy = () => {
        this.props.buyDragon({ dragonId: this.props.dragon.dragonId, saleValue: this.props.dragon.saleValue });
    }

    handleMouseEnter = () => {
        this.setState({ onHover: true });
    }

    handleMouseLeave = () => {
        this.setState({ onHover: false });
    }

    render() {
        const { nickname, birthdate, traits, saleValue, dragonId, isPublic } = this.props.dragon;
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
                        Price: {saleValue} Crowns 
                        {this.state.onHover && (
                        <span>
                            <Button 
                                size='sm' 
                                variant='primary' 
                                className="buy-button"
                                onClick={this.handleBuy}>
                                Buy
                            </Button>
                        </span>)
                        }
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
