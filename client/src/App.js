import React from 'react';
import Headerbar from './Headerbar';
import Footerbar from './Footerbar';
import Pagination from './Pagination';

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
    if(coupon===1) {
      // let arr2 = [...this.state.nodeData];
      // this.setState({nodeData: arr2})
    }

    return ( <div> {this.state.nodeData.map(e => 
      this.state.nodeData.indexOf(e) === 0 ? <h3><b>{e}</b></h3> : <p>{e}</p> //apply styling to coupon
    )} </div> )
  }

  render() {
    if(this.state.showDetails && this.state.nodeData[0]!=='') //if has coupon code
      return (this.renderData(1));

    else if(this.state.showDetails) //if no coupon
      return (this.renderData(0));
    
    else
      return (<button className="btn btn-outline-dark btn-sm" onClick={this.handleClick}>SEE MORE</button>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dealSite: '/ozb',
                    data: [], 
    };
  }

  componentDidMount() {
    fetch(this.state.dealSite)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }

  render() {
    switch (this.state.dealSite) {
    case '/ozb':  
      return (
      <div className="app">
        <Headerbar />
        <h1 className="p-4">Oz Bargain</h1>
        <ul>
          {this.state.data.map((data,i) =>
              <li key={i} className="p-1">
                <div className="row">
                  <div className="col-xs mx-auto">
                    <img src={data.image} alt="deal-node" height="100vw" width="150vw"/>
                  </div>
                  <div className="col">
                    {/* <h3><a rel="nofollow" href={data.link.replace('node','goto')}>{data.title}</a></h3> */}
                    <h3><a rel="nofollow" target="_blank" href={data.link}>{data.title}</a></h3>
                    <h6>{data.submitDetail}</h6>
                    <ReactDetailsButton LinkInfo={data.link}/>
                  </div>
                </div>
              <br/>
            </li>
          )}
        </ul>
        <Pagination />
        <Footerbar />
      </div> )
    case '/ffeeds':
      return (
        <div className="app">
          <Headerbar />
          <h1 className="p-4">Frugal Feeds</h1>
          <ul>
            {this.state.data.map((data,i) =>
                <li key={i} className="p-1">
                  <div className="row">
                    <div className="col-xs mx-auto">
                      <img src={data.image} alt="deal-node" height="100vw" width="150vw"/>
                    </div>
                    <div className="col">
                      {/* <h3><a rel="nofollow" href={data.link.replace('node','goto')}>{data.title}</a></h3> */}
                      <h3><a rel="nofollow" target="_blank" href={data.link}>{data.title}</a></h3>
                      <h6>{data.submitDetail}</h6>
                      <ReactDetailsButton LinkInfo={data.link}/>
                    </div>
                  </div>
                <br/>
              </li>
            )}
          </ul>
          <Pagination />
          <Footerbar />
        </div>
      )
      default:
      return ( <div></div> );
}}
}
export default App; 
