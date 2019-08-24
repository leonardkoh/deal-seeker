import React from 'react';
import imagePH from './ImagePH.png';
import HeaderBar from './HeaderBar'

class ReactDetailsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: false,
      nodeData: ['CLIENT']
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // fetch('/ozbnode')
    // .then(res => res.json())
    // .then(nd => this.setState({ nodeData: nd }));
    // console.log(this.props.LinkInfo) 
    
    // this.setState({nodeLink: this.props.LinkInfo});
  }
  
  handleClick(e) {
    this.setState({showDetails: true});

    // console.log(e.target.value);

    fetch('/ozbnode', { method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({link: e.target.value})})
      .then(res => res.json())
      .then(data => this.setState({ nodeData: data }));

      console.log(this.state.nodeData);
  }

  render() {
    if(this.state.showDetails)
      return (
      <div> {this.state.nodeData.map(e => 
        this.state.nodeData.indexOf(e) === 0 ? <h3><b>{e}</b></h3> : <h6>{e}</h6> //apply styling to coupon (index 0) to be refactored
      )} </div> )
      // <div>{this.state.nodeData[0]}</div>);
    else
      return (<button className="btn btn-outline-primary btn-sm" value={this.props.LinkInfo} onClick={this.handleClick}>SEE MORE</button>);
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
      {/* <h1>Ozbargain Deals</h1> */}
      <ul>
        {this.state.data.map((data,i) =>
            <li key={i}>
              <div className="row">
                <div className="col-xs">
                  <img src={imagePH} alt="deal-node" height="50vw" width="50vw"/>
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
