import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loading-overlay';
import { loadData } from '../actions/index';

import s from './styles.css';

const mapStateToProps = ({ data, isLoaded }) => ({ data, isLoaded });
const mapDispatchToProps = dispatch => ({
    loadData: () => dispatch(loadData()),
});

class Main extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        return (
            <Loadable
                active={!this.props.isLoaded}
                spinner
                text="Loading your content..."
                className={s.loader}
            >
                <h1>{JSON.stringify(this.props.data)}</h1>
            </Loadable>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
