import React from 'react';

class ReactButtonDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: "false" }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ showDetails: "true"})
  }

  render() {
    return (<div>state: {this.state.showDetails}</div>);
    
    // return (<button>{this.props.LinkInfo}</button>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [],
                   showDetails: false,
                   showComments: false
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    fetch(`/ozb`)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }
  
  onClick(e) {
    // this.setState({ showDetails: true})
    console.log(e.target.value);
  } 

  render() {
    return (
    <div className="App">
      <h1>Data</h1>
      <ul>
        {this.state.data.map(data =>
          <li>
            <h3>{data.title}</h3>
            <p className="font-italic">{data.submitDetail}</p>
            <a href={data.link} className="btn btn-outline-primary btn-sm" value="DETAILS">DETAILS</a>
            <a href={data.link} className="btn btn-outline-primary btn-sm" value="COMMENTS">COMMENTS</a>
            <button className="btn btn-outline-secondary btn-sm" value={data.link} onClick={this.onClick}>TOGGLE</button>
            <br/>
            <ReactButtonDetails LinkInfo={data.link} showDetails={this.state.showDetails}/>
          </li>
        )}
      </ul> 
    </div>
  )}
}

export default App;
