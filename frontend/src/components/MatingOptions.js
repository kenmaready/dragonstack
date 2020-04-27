import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import MatingOptionsRow from './MatingOptionsRow';

class MatingOptions extends Component {
    
    render() {
        console.log(this.props.accountDragons.dragons);
        return (
            <div className='mating-card'>
                <h6>Select a Dragon from your stables to mate with this Dragon:</h6>
                {
                    this.props.accountDragons.dragons.map(dragon => {
                        return <MatingOptionsRow key={dragon.dragonId} dragon={dragon} fatherDragonId={this.props.fatherDragonId} />    
                    })
                }
            </div>
        )
    }
}

MatingOptions.proptypes = {
    accountDragons: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    accountDragons: state.accountDragons
});

export default connect(mapStateToProps)(MatingOptions);
