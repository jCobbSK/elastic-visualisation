import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loading-overlay';
import { Grid } from 'react-bootstrap';

import SearchContainer from './search/SearchContainer.jsx';
import TreeView from './tree/TreeView.jsx';
import Navbar from './navbar/Navbar.jsx';

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
        <Grid>
          <Navbar />
          <SearchContainer />
          <TreeView
            data={this.props.data}
          />
        </Grid>
      </Loadable>
    );
  }
}

Main.propTypes = {
  loadData: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
  data: PropTypes.array,
};

Main.defaultProps = {
  isLoaded: false,
  data: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
