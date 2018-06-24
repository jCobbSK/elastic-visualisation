import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

import s from './TreeLabelStyle.css';

export default function TreeLabel(props) {
  const content = `${props.name} (${props.size})`;
  const glyph = props.expanded ? 'arrow-down' : 'arrow-right';

  const style = props.leftPad ? {
    paddingLeft: props.leftPad,
  } : {};

  if (!props.onClick) {
    return (
      <div style={style}>{content}</div>
    );
  }

  return (
    <label onClick={props.onClick} className={s.label} style={style}>
      <Glyphicon glyph={glyph} className={s.glyph} />
      {content}
    </label>
  );
}

TreeLabel.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  leftPad: PropTypes.string,
};

TreeLabel.defaultProps = {
  expanded: false,
  onClick: null,
  leftPad: '',
};
