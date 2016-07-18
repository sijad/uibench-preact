/** This is a direct fork of the React 15.x version from localvoid. It seems to show roughly the same performance. */

import { h, Component, render, options } from 'preact';


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

  render(props) {
    return <td class="TableCell" onClick={this.onClick}>{props.text}</td>;
  }
}

class TableRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    var data = props.data;
    var classes = 'TableRow';
    if (data.active) {
      classes = 'TableRow active';
    }
    var cells = data.props;

    var children = [<TableCell key="-1" text={'#' + data.id}></TableCell>];
    for (var i = 0; i < cells.length; i++) {
      children.push(<TableCell key={i} text={cells[i]}></TableCell>);
    }

    return <tr class={classes} data-id={data.id}>{children}</tr>;
  }
}

class Table extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    var items = props.data.items;

    var children = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      children.push(<TableRow key={item.id} data={item} />);
    }

    return <table class="Table"><tbody>{children}</tbody></table>;
  }
}


class AnimBox extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    var data = props.data;
    var time = data.time;
    var style = {
      'borderRadius': (time % 10).toString() + 'px',
      'background': 'rgba(0,0,0,' + (0.5 + ((time % 10) /10)).toString() + ')'
    };

    return <div class="AnimBox" data-id={data.id} style={style} />;
  }
}

class Anim extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    var data = props.data;
    var items = data.items;

    var children = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      children.push(<AnimBox key={item.id} data={item} />);
    }

    return <div class="Anim">{children}</div>;
  }
}

class TreeLeaf extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    return <li class="TreeLeaf">{props.data.id}</li>;
  }
}

class TreeNode extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    var data = props.data;
    var children = [];

    for (var i = 0; i < data.children.length; i++) {
      var n = data.children[i];
      if (n.container) {
        children.push(<TreeNode key={n.id} data={n} />);
      } else {
        children.push(<TreeLeaf key={n.id} data={n} />);
      }
    }

    return <ul class="TreeNode">{children}</ul>;
  }
}

class Tree extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    return <div class="Tree"><TreeNode data={props.data.root} /></div>;
  }
}

class Main extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render(props) {
    var data = props.data;
    var location = data.location;

    var section;
    if (location === 'table') {
      section = <Table data={data.table}></Table>;
    } else if (location === 'anim') {
      section = <Anim data={data.anim}></Anim>;
    } else if (location === 'tree') {
      section = <Tree data={data.tree}></Tree>;
    }

    return <div class="Main">{section}</div>;
  }
}


uibench.init('Preact', '5.3.1');

document.addEventListener('DOMContentLoaded', function(e) {
  var container = document.querySelector('#App'),
  	start = Date.now(),
  	root;

  uibench.run(
      function(state) {
        root = render(<Main data={state}/>, container, root);
      },
      function(samples) {
        root = render(<pre>{JSON.stringify(samples, null, ' ')}</pre>, container, root);
		console.log(Date.now()-start);
      }
  );
});
