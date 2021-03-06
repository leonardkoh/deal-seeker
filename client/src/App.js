import React from 'react';
import Headerbar from './Headerbar';
import Footerbar from './Footerbar';
import Pagination from './Pagination';

class ReactDetailsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {showDetails: false,
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
    if(coupon && this.state.nodeData[0].length > 0) {
      
      console.log('HAS COUPON')
      // todo: substring this.state.nodeData[2] to remove coupon
    }

    return ( <div> {this.state.nodeData.map(e => 
      this.state.nodeData.indexOf(e) === 0 ? <p><b>{e}</b></p> : <p>{e}</p> //apply styling to coupon
    )} 
    <button className="btn btn-outline-dark btn-sm" onClick={this.handleClickSeeLess}>SEE LESS</button>
    </div> )
  }

  render() {
    if(this.state.showDetails && this.state.nodeData[0]!=='' && this.state.nodeData[0]!==undefined) // has coupon
      return (this.renderData(true));

    else if(this.state.showDetails) //if no coupon
      return (this.renderData(false));
    
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
  }

  componentDidMount() {
    this.loadData(this.state.site);
  }

  updatePage(e) {
    this.setState({site: e});
    this.loadData(e);
  }

  loadData(site) {
    fetch(site)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }

  render() {
    if(this.state.site === '/ozb') {
      return (
      <div className="app">
        <Headerbar site={this.updatePage}/>
        <h1 className="p-4">Oz Bargain</h1>
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
      </div> )}
    else if (this.state.site === '/ffeeds' || 'ddeals') {
      return (
        <div className="app">
          <Headerbar site={this.updatePage}/>
          {this.state.site === '/ffeeds' ? <h1 className="p-4">Frugal Feeds</h1> : <h1 className="p-4">Decent Deals</h1>}
          <ul>
            {this.state.data.map((data,i) =>
                <li key={i} className="p-1">
                  <div className="row">
                    <div className="col-xs mx-auto">
                      <img src={data.image} alt="deal-node" height="100vw" width="150vw"/>
                    </div>
                    <div className="col">
                      <h3><a rel="nofollow" target="_blank" href={data.link}>{data.title}</a></h3>
                      <h6>{data.date}</h6>
                      <p>{data.info}</p>
                      {/* <ReactDetailsButton LinkInfo={data.link}/> */}
                    </div>
                  </div>
                <br/>
              </li>
            )}
          </ul>
          <Footerbar />
        </div>
      )}
      else
        return ( <div></div> );
}
}
export default App; 