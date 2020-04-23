import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DragonAvatar from './DragonAvatar';
import { fetchDragon } from '../redux/actions';

class Dragon extends Component {

    render() {
        const { dragon } = this.props;

        return (
            <div className='card'>
                <div className='card-body'>     
                    <DragonAvatar dragon={dragon}/>
                    <br />
                    <Button className="new-dragon-button" onClick={this.props.fetchDragon}>Get New Dragon</Button>
                </div> 
            </div>  
        );
    }
}

Dragon.proptypes = {
    dragon: PropTypes.object.isRequired,
    fetchDragon: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    dragon: state.dragon
});

export default connect(mapStateToProps, { fetchDragon })(Dragon);