import { h, render, Component } from 'preact';

class TableCell extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.text !== nextProps.text;
  }

  onClick(e) {
    console.log('Clicked' + this.props.text);
    e.stopPropagation();
  }

  render() {
    return (<td class="TableCell" onClick={this.onClick}>{this.props.text}</td>);
  }
}

class TableRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    var data = this.props.data;
    var classes = 'TableRow';
    if (data.active) {
      classes = 'TableRow active';
    }
    var cells = data.props;

    var children = [(<TableCell text={'#' + data.id}></TableCell>)];
    for (var i = 0; i < cells.length; i++) {
      children.push((<TableCell text={cells[i]}></TableCell>));
    }

    return (<tr class={classes} data-id={data.id}>{children}</tr>);
  }
}

export class Table extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    var items = this.props.data.items;

    var children = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      children.push((<TableRow data={item} />));
    }

    return (<table class="Table"><tbody>{children}</tbody></table>);
  }
}
