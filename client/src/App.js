import React from 'react';
import Headerbar from './Headerbar';
import Footerbar from './Footerbar';


class ReactDetailsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: false,
      nodeData: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderData = this.renderData.bind(this);
  }
  
  handleClick() {
    this.setState({showDetails: true});

    fetch('/ozbnode', { method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({link: this.props.LinkInfo})})
      .then(res => res.json())
      .then(data => this.setState({ nodeData: data }));
  }

  renderData(coupon) {
    if(coupon==1) {
      // let arr2 = [...this.state.nodeData];
      // this.setState({nodeData: arr2})
    }

    return ( <div> {this.state.nodeData.map(e => 
      this.state.nodeData.indexOf(e) === 0 ? <h3><b>{e}</b></h3> : <h6>{e}</h6> //apply styling to coupon
    )} </div> )
  }

  render() {
    if(this.state.showDetails && this.state.nodeData[0]!=='') //if has coupon code
      return (this.renderData(1));

    else if(this.state.showDetails) //if no coupon
      return (this.renderData(0));
    
    else
      return (<button className="btn btn-outline-primary btn-sm" onClick={this.handleClick}>SEE MORE</button>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`/ozb`)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }

  render() {
    return (
    <div className="app container">
      <Headerbar />
      <h1>Ozbargain</h1>
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
      <Footerbar />
    </div>
  )}
}

export default App;
