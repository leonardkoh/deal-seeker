import React from 'react';

class ReactDetailsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: false, 
      nodeData: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // this.setState({showDetails: true})
    // if(this.state.showDetails)
    //   console.log(`props: ${this.props.LinkInfo}`);
    fetch('/ozbNode')
    .then(res => res.json())
    .then(nd => this.setState({ nodeData: nd }))
  }

  render() {
    if(this.state.showDetails)
    return (<div>{this.props.LinkInfo}</div>)
    else
    return( <button className="btn btn-outline-primary btn-sm" value={this.props.LinkInfo} onClick={this.handleClick}>SEE MORE</button>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [],
    };
  }

  componentDidMount() {
    fetch(`/ozb`)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }

  render() {
    return (
    <div className="App">
      <h1>Ozbargain Deals</h1>
      <ul>
        {this.state.data.map((data,i) =>
          <li key={i}>
            <h3>{data.title}</h3>
            <h6 className="font-italic">{data.submitDetail}</h6>
                <ReactDetailsButton LinkInfo={data.link}/>
            <br/>
          </li>
        )}
      </ul> 
    </div>
  )}
}

export default App;
