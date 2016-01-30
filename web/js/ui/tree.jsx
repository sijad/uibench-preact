import { h, render, Component } from 'preact';

class TreeLeaf extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    return (<li class="TreeLeaf">{this.props.data.id}</li>);
  }
}

class TreeNode extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    var data = this.props.data;
    var children = [];

    for (var i = 0; i < data.children.length; i++) {
      var n = data.children[i];
      if (n.container) {
        children.push((<TreeNode data={n} />));
      } else {
        children.push((<TreeLeaf data={n} />));
      }
    }

    return (<ul class="TreeNode">{children}</ul>);
  }
}

export class Tree extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    return (<div class="Tree"><TreeNode data={this.props.data.root} /></div>);
  }
}
