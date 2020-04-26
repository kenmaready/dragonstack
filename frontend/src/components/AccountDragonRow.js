import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

import { updateDragon } from '../redux/actions';

export class AccountDragonRow extends Component {
    state = {
            edit: false,
            editSaleValue: false,
            onHover: false,
            nickname: this.props.dragon.nickname,
            newName: '',
            isPublic: this.props.dragon.isPublic,
            saleValue: this.props.dragon.saleValue,
            newSaleValue: null
    }
    
    handleNameClick = () => {
        console.log(`Dragon ${this.props.dragon.dragonId} clicked...`);
        this.setState({ edit: !this.state.edit, onHover: false });
    }

    handleSaleValueClick = () => {
        this.setState({ editSaleValue: !this.state.editSaleValue, onHover: false });
    }

    handleIsPublicClick = () => {
        this.setState({ isPublic: !this.state.isPublic });
        this.props.updateDragon({ dragonId: this.props.dragon.dragonId, isPublic: !this.state.isPublic });
    }

    handleInputAreaClick = event => {
        event.stopPropagation();
    }
    
    handleMouseEnter = () => {
        console.log(`Starting hover on ${this.props.dragon.dragonId}`);
        this.setState({ onHover: true });
    }

    handleMouseLeave = () => {
        console.log(`Finished hover on ${this.props.dragon.dragonId}`)
        this.setState({ onHover: false });
    }
    
    handleSubmitName = (event) => {
        console.log("submitting new name: ", this.state.newName);
        event.stopPropagation();
        this.props.updateDragon({ dragonId: this.props.dragon.dragonId, nickname: this.state.newName });
        this.setState({ nickname: this.state.newName, edit: false, onHover: false, newName: '' });
    }

    handleSubmitSaleValue = (event) => {
        console.log("submitting new sale value: ", this.state.newSaleValue);
        event.stopPropagation();
        this.props.updateDragon({ dragonId: this.props.dragon.dragonId, saleValue: this.state.newSaleValue });
        this.setState({ saleValue: this.state.newSaleValue, editSaleValue: false, onHover: false, newSaleValue: null });
    }

    updateName = event => {
        this.setState({ newName: event.target.value });
    }

    updateSaleValue = event => {
        this.setState({ newSaleValue: event.target.value });
    }

    render() {
        const { birthdate, traits, dragonId } = this.props.dragon;
        const renderTraits = traits.map((trait, ix) => {
            return ( 
            <span key={`${dragonId}.${ix}`}>
                {(ix === (traits.length - 1)) ? `${trait.traitValue}.`: `${trait.traitValue}, `} 
            </span>
            )
        });

        const nameEditField = (
            <span className='dragon-row-name-input' onClick={this.handleInputAreaClick}>
                <InputGroup inline='true' size='sm' as='span' className="mb-3">
                    <FormControl
                        placeholder="Dragon's new name"
                        aria-label="Dragon's new name"
                        area-describedby="basic-addon2"
                        type='text'
                        value={this.state.newName}
                        onChange={this.updateName}
                    />
                    <InputGroup.Append>
                        <Button variant='outline-secondary' onClick={this.handleSubmitName}>Save New Name</Button>
                    </InputGroup.Append>
                </InputGroup>
            </span>
        );

        const saleValueEditField = (
            <span onClick={this.handleInputAreaClick}>
                <InputGroup inline="true" size="sm">
                    <FormControl
                        placeholder="New value"
                        aria-label="New Value"
                        area-describedby="basic-addon2"
                        type='number'
                        value={this.state.newValue}
                        onChange={this.updateSaleValue}
                    />
                    <InputGroup.Append>
                        <Button variant='outline-secondary' onClick={this.handleSubmitSaleValue}>Save New Value</Button>
                    </InputGroup.Append>
                </InputGroup>
            </span>
        );

        return (
            <div className="dragon-row" onMouseEnter={this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave} >
                Dragon {dragonId}: &nbsp;
                <span className='input-field' onClick={this.handleNameClick}>
                    {this.state.nickname ? this.state.nickname : "unnamed"} |&nbsp; 
                </span>
                Born {moment(birthdate).format("MMMM Do, YYYY")} |&nbsp;
                Description: {renderTraits} |&nbsp;
                <span className='input-field' onClick={this.handleIsPublicClick}>
                    Public: {this.state.isPublic ? 'Yes' : 'No'} |&nbsp;
                </span>
                <span className='input-field' onClick={this.handleSaleValueClick}>
                    Value: {this.state.saleValue} Crowns
                </span>
                {this.state.edit && nameEditField} 
                {this.state.editSaleValue && saleValueEditField}
            </div>
        )
    }
}

AccountDragonRow.proptypes = {
    dragon: PropTypes.object.isRequired,
    updateDragon: PropTypes.func.isRequired
};

export default connect(null, { updateDragon })(AccountDragonRow);
