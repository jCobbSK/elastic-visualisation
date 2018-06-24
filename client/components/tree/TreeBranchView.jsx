import React from 'react';

import TreeLabel from './TreeLabel.jsx';

const LEVEL_SPACING_PX = 15;

export default class TreeBranchView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  onToggleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  hasChildren = () => this.props.data.children && this.props.data.children.length > 0

  render() {
    const { name, size, children, openedForSearch } = this.props.data;
    const { level } = this.props;

    const paddingLeft = `${level * LEVEL_SPACING_PX}px`;

    if (openedForSearch === false) {
      return null;
    }

    if (!this.hasChildren()) {
      return (
        <TreeLabel name={name} size={size} leftPad={paddingLeft} />
      );
    }

    if (this.state.expanded || openedForSearch === true) {
      return (
        <div>
          <TreeLabel
            onClick={this.onToggleClick}
            name={name}
            size={size}
            expanded
            leftPad={paddingLeft}
          />
          {children.map(item => (
            <TreeBranchView data={item} key={item.name} level={level + 1} />
          ))}
        </div>
      );
    }

    return (
      <TreeLabel
        onClick={this.onToggleClick}
        name={name}
        size={size}
        expanded={false}
        leftPad={paddingLeft}
      />
    );
  }
}
