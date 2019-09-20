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
    this.handleClickSeeLess = this.handleClickSeeLess.bind(this);
  }
  
  handleClick() {
    this.setState({showDetails: true});

    fetch('/ozbnode', { method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({link: this.props.LinkInfo})})
      .then(res => res.json())
      .then(data => this.setState({ nodeData: data }));
  }
  
  handleClickSeeLess() {
    this.setState({showDetails: false,
      nodeData: []});
  }

  renderData(coupon) {
    if(coupon===1) {
      // let arr2 = [...this.state.nodeData];
      // this.setState({nodeData: arr2})
    }

    return ( <div> {this.state.nodeData.map(e => 
      this.state.nodeData.indexOf(e) === 0 ? <p><b>{e}</b></p> : <p>{e}</p> //apply styling to coupon
    )} 
    <button className="btn btn-outline-dark btn-sm" onClick={this.handleClickSeeLess}>SEE LESS</button>
    </div> )
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

    this.state = { site: '/ozb',
                    data: [], 
    };

    this.updatePage = this.updatePage.bind(this);
    // this.updateSite = this.updateSite.bind(this);
  }

  componentDidMount() {
    this.loadData(this.state.site);
  }

  updatePage(e) {
    // this.setState({site: e.target.value});
    // this.loadData(e.target.value);
    this.setState({site: e});
    this.loadData(e);
  }

  loadData(site) {
    fetch(site)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }

  render() {
    switch (this.state.site) {
    case '/ozb':  
      return (
      <div className="app">
        <Headerbar site={this.updatePage}/>
        <h1 className="p-4">Oz Bargain</h1>
        <button onClick={this.updatePage} value="/ffeeds">Frugal Feeds</button> 
        <ul>
          {this.state.data.map((data,i) =>
              <li key={i} className="p-1">
                <div className="row">
                  <div className="col-xs mx-auto">
                    <img src={data.image} alt="deal-node" height="100vw" width="150vw"/>
                  </div>
                  <div className="col">
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
          <Headerbar site={this.updatePage}/>
          <h1 className="p-4">Frugal Feeds</h1>
          <button onClick={this.updatePage} value="/ozb">OzBargain</button> 
          <ul>
            {this.state.data.map((data,i) =>
                <li key={i} className="p-1">
                  <div className="row">
                    <div className="col-xs mx-auto">
                      <img src={data.image} alt="deal-node" height="100vw" width="150vw"/>
                    </div>
                    <div className="col">
                      <h3><a rel="nofollow" target="_blank" href={data.link}>{data.title}</a></h3>
                      <p>{data.info}</p>
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
