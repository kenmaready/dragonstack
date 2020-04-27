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
            editSireValue: false,
            onHover: false,
            nickname: this.props.dragon.nickname,
            newName: '',
            isPublic: this.props.dragon.isPublic,
            saleValue: this.props.dragon.saleValue,
            newSaleValue: '',
            sireValue: this.props.dragon.sireValue,
            newSireValue: ''
    }
    
    handleNameClick = () => {
        this.setState({ edit: !this.state.edit, onHover: false });
    }

    handleSaleValueClick = () => {
        this.setState({ editSaleValue: !this.state.editSaleValue, onHover: false });
    }

    handleSireValueClick = () => {
        this.setState({ editSireValue: !this.state.editSireValue, onHover: false });
    }

    handleIsPublicClick = () => {
        this.setState({ isPublic: !this.state.isPublic });
        this.props.updateDragon({ dragonId: this.props.dragon.dragonId, isPublic: !this.state.isPublic });
    }

    handleInputAreaClick = event => {
        event.stopPropagation();
    }
    
    handleMouseEnter = () => {
        this.setState({ onHover: true });
    }

    handleMouseLeave = () => {
        this.setState({ onHover: false });
    }
    
    handleSubmitName = (event) => {
        event.stopPropagation();
        this.props.updateDragon({ dragonId: this.props.dragon.dragonId, nickname: this.state.newName });
        this.setState({ nickname: this.state.newName, edit: false, onHover: false, newName: '' });
    }

    handleSubmitSaleValue = (event) => {
        event.stopPropagation();
        this.props.updateDragon({ dragonId: this.props.dragon.dragonId, saleValue: this.state.newSaleValue });
        this.setState({ saleValue: this.state.newSaleValue, editSaleValue: false, onHover: false, newSaleValue: '' });
    }

    handleSubmitSireValue = (event) => {
        event.stopPropagation();
        this.props.updateDragon({ dragonId: this.props.dragon.dragonId, sireValue: this.state.newSireValue });
        this.setState({ sireValue: this.state.newSireValue, editSireValue: false, onHover: false, newSireValue: '' });
    }

    updateName = event => {
        this.setState({ newName: event.target.value });
    }

    updateSaleValue = event => {
        this.setState({ newSaleValue: event.target.value });
    }

    updateSireValue = event => {
        this.setState({ newSireValue: event.target.value });
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
                <InputGroup inline="true" size="sm" as="span">
                    <FormControl
                        placeholder="New Sale Value"
                        aria-label="New Sale Value"
                        area-describedby="basic-addon2"
                        type='number'
                        value={this.state.newSaleValue}
                        onChange={this.updateSaleValue}
                        className="input-sm"
                    />
                    <InputGroup.Append>
                        <Button variant='outline-secondary' onClick={this.handleSubmitSaleValue}>Save New Sale Value</Button>
                    </InputGroup.Append>
                </InputGroup>
            </span>
        );

        const sireValueEditField = (
            <span onClick={this.handleInputAreaClick}>
                <InputGroup inline="true" size="sm" as="span">
                    <FormControl
                        placeholder="New Sire Value"
                        aria-label="New Sire Value"
                        area-describedby="basic-addon2"
                        type='number'
                        value={this.state.newSireValue}
                        onChange={this.updateSireValue}
                        className="input-sm"
                    />
                    <InputGroup.Append>
                        <Button variant='outline-secondary' onClick={this.handleSubmitSireValue}>Save New Sire Value</Button>
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
                    Sale Value: {this.state.saleValue} Crowns |&nbsp;
                </span>
                <span className='input-field' onClick={this.handleSireValueClick}>
                    Sire Value: {this.state.sireValue} Crowns
                </span>
                {this.state.edit && nameEditField} 
                {this.state.editSaleValue && saleValueEditField}
                {this.state.editSireValue && sireValueEditField}
            </div>
        )
    }
}

AccountDragonRow.proptypes = {
    dragon: PropTypes.object.isRequired,
    updateDragon: PropTypes.func.isRequired
};

export default connect(null, { updateDragon })(AccountDragonRow);
