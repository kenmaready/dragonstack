import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PublicDragonRow from './PublicDragonRow';
import { fetchPublicDragons } from '../redux/actions';

export class PublicDragons extends Component {
    componentDidMount() {
        this.props.fetchPublicDragons();
    }

    render() {
        const { dragons } = this.props;
        let renderDragons = 
        (dragons.length > 0) ? (
            dragons.map(dragon => {
                return (
                    <div key={dragon.dragonId}>
                      <PublicDragonRow dragon={dragon}/>
                    </div>
                    ); 
        })) : (
            <div>
                <hr />
                <h4> No dragons currently available</h4>
                <hr />
            </div>
        );

        return (
            <Fragment>
                <div className="header-space" />
                    <div className="container">
                        <h2>Available Dragons ...</h2>
                        <div className='account-dragons-window'>
                        {renderDragons}
                    </div> 
                </div>
            </Fragment>                
        )
    }
}

PublicDragons.proptypes = {
    dragons: PropTypes.array.isRequired,
    fetchPublicDragons: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    dragons: state.publicDragons.dragons
});

export default connect(mapStateToProps, { fetchPublicDragons })(PublicDragons);
