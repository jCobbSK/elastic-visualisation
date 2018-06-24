import React from 'react';
import { Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

export default class SearchContainer extends React.PureComponent {
  render() {
    return (
      <Row>
        <Col sm={6} style={{ margin: '0 auto' }}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" />
              <InputGroup.Button>
                <Button>Search</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
