import React from 'react';
import imagePH from './ImagePH.png';
import HeaderBar from './HeaderBar'

class ReactDetailsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: false,
      nodeData: []
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({showDetails: true});

    fetch('/ozbnode', { method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({link: this.props.LinkInfo})})
      .then(res => res.json())
      .then(data => this.setState({ nodeData: data }));
  }

  render() {
    if(this.state.showDetails && this.state.nodeData[0]!=='') // if has coupon code
      return (
      <div> {this.state.nodeData.map(e => 
        this.state.nodeData.indexOf(e) === 0 ? <h3><b>{e}</b></h3> : <h6>{e}</h6> //apply styling to coupon
      )} </div> )
    else if(this.state.showDetails)
    return (
    <div> {this.state.nodeData.map(e => 
      this.state.nodeData.indexOf(e) === 0 ? <h3><b>{e}</b></h3> : <h6>{e}</h6> //apply styling to coupon
    )} </div>) 
    else
      return (<button className="btn btn-outline-primary btn-sm" onClick={this.handleClick}>SEE MORE</button>);
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
    <div className="app">
      <HeaderBar />
      <h1>Ozbargain Deals</h1>
      <ul>
        {this.state.data.map((data,i) =>
            <li key={i}>
              <div className="row">
                <div className="col-xs">
                  <img src={data.image} alt="deal-node" height="100vw" width="150vw"/>
                </div>
                <div className="col">
                  <h3>{data.title}</h3>
                  <h6 className="font-italic">{data.submitDetail}</h6>
                  <ReactDetailsButton LinkInfo={data.link}/>
                </div>
              </div>
            <br/>
          </li>
        )}
      </ul>
    </div>
  )}
}

export default App;
