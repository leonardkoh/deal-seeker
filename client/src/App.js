import React from 'react';

class ReactDetailsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: false }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('button clicked');
    this.setState({showDetails: true})
    if(this.state.showDetails)
      console.log(`props: ${this.props.LinkInfo}`);
  }

  render() {
    return( <button className="btn btn-outline-secondary btn-sm" value={true} onClick={this.handleClick}>DETAILS BUTTON</button>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [],
    };

    // this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    fetch(`/ozb`)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }

  render() {
    return (
    <div className="App">this.props.showDetails
      <h1>Data</h1>
      <ul>
        {this.state.data.map(data =>
          <li>
            <h3>{data.title}</h3>
            <p className="font-italic">{data.submitDetail}</p>
            <a href={data.link} className="btn btn-outline-primary btn-sm" value="DETAILS">DETAILS</a>
            <button className="btn btn-outline-secondary btn-sm" value={true} onClick={this.onClick}>TOGGLE</button>
            <br/>
            <ReactDetailsButton LinkInfo={data.link}/>
          </li>
        )}
      </ul> 
    </div>
  )}
}

export default App;
