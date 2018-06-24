import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

import { triggerSearchAction } from '../../actions/index';

const mapDispatchToProps = (dispatch) => ({
  triggerSearch: (searchTerm) => {
    dispatch(triggerSearchAction(searchTerm));
  },
});

class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onSearchChange = (ev) => {
    this.setState({
      value: ev.target.value,
    });
  }

  onSearch = () => {
    this.props.triggerSearch(this.state.value);
  }

  onClearSearch = () => {
    this.setState({
      value: '',
    }, this.onSearch);
  }

  render() {
    return (
      <Row>
        <Col sm={6} style={{ margin: '0 auto' }}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" value={this.state.value} onChange={this.onSearchChange} />
              <InputGroup.Button>
                <Button onClick={this.onSearch}>Search</Button>
              </InputGroup.Button>
              {this.state.value &&
                <InputGroup.Button>
                  <Button onClick={this.onClearSearch}>Clear</Button>
                </InputGroup.Button>
              }
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(SearchContainer);
