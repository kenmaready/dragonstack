import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { fetchGeneration } from '../redux/actions';

const MINIMUM_DELAY = 3 * 1000;

class Generation extends Component {
    timer = null;

    componentDidMount() {
        this.fetchNextGeneration();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        console.log("clearTimeout activated. Timer is now: ", this.timer);
    }

    fetchNextGeneration = () => {
        this.props.fetchGeneration();

        let delay = Math.max(this.props.generation.expiration - moment(), MINIMUM_DELAY);
        console.log(delay);
        this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    }

    render() {
        const { generation } = this.props;

        return (
            <div className='card'>
                <div className='card-body'>
                    <div className='card-text'>
                        <h4>Generation:</h4>
                        <h5>Currently on Generation&nbsp; 
                            {generation.generationId && 
                            generation.generationId} ...</h5>
                        <h5>Generation expires&nbsp; 
                        {generation.expiration && generation.expiration.format("h:mm:ss a")} ...</h5>
                    </div>
                </div>
            </div>
        )
    }
}

Generation.proptypes = {
    generation: PropTypes.object.isRequired,
    fetchGeneration: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    generation: state.generation
})

const mapDispatchToProps = {
    fetchGeneration
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(Generation);