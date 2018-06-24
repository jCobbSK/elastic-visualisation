import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TreeBranchView from './TreeBranchView.jsx';

export default class TreeView extends React.PureComponent {
  render() {
    return (
      <Row>
        <Col sm={12}>
          {this.props.data.map(item => (
            <TreeBranchView data={item} key={item.name} level={0} />
          ))}
        </Col>
      </Row>
    );
  }
}
