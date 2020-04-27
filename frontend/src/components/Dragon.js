import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DragonAvatar from './DragonAvatar';
import { fetchDragon } from '../redux/actions';

class Dragon extends Component {
    get DragonView() {
        const { dragon } = this.props;
        if (dragon.error) {
            return <h5>{dragon.error}</h5>
        } else {
            return <DragonAvatar dragon={dragon}/>
        }
    }

    render() {
        const { dragon } = this.props;

        return (
            <div className='card'>
                <div className='card-body'>     
                    { this.DragonView }
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