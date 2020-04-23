import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { slender, athletic, thicc, solid, striped, spotted, diamond, flames} from '../assets';

const propertyMap = {
    backgroundColor: {
        green: '#a5d6a7', 
        yellow: '#FFFF40', 
        red: '#FF0000', 
        blue: '#0277bd', 
        white: '#cfd8dc', 
        black: '#263238'},
    build: { slender, athletic, thicc },
    pattern: { solid,  striped, spotted, diamond, flames },
    size: { small: 100, medium: 140, large: 180, giant: 210 }
};

class DragonAvatar extends Component {
    get DragonImage() {
        const dragonPropertyMap = {};
        this.props.dragon.traits.forEach(({traitType, traitValue }) => {
            dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
        });
        const sizing = { width: dragonPropertyMap.size, height: dragonPropertyMap.size };

        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{ backgroundColor: dragonPropertyMap.backgroundColor, ...sizing }}>
                    <img src={dragonPropertyMap.pattern} className='dragon-avatar-image-pattern' style={sizing} />
                    <img src={dragonPropertyMap.build} className='dragon-avatar-image' style={sizing} />
                </div>
            </div>
        )
    }
    
    render() {
        const { nickname, dragonId, generationId, birthdate, traits } = this.props.dragon;
        const traitString = traits.map(({traitType, traitValue}) => {
            return traitValue;
        }).join(', ');

        return (
            <div>
                <h4>Current Dragon:</h4>
                <h5>Name: {nickname ? nickname : 'Unnamed'}</h5>
                <h5>Dragon Id: {dragonId}</h5>
                <h5>Generation {generationId}</h5>
                <h5>Birthdate: {birthdate.format("MMMM Do, YYYY")}</h5>
                <h5>Description: {traitString} </h5>
                { this.DragonImage }
            </div>
        )
    }
}

export default DragonAvatar;