import React from 'react';

class ReactDetailsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: false, 
      nodeData: ''
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/ozbnode')
    .then(res => res.json())
    .then(nd => this.setState({ nodeData: nd }));
  }
  
  handleClick() {
    this.setState({showDetails: true});
    console.log(this.state.nodeData);
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
    <div className="app">
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Deal Seeker</a> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Ozbargain <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link 2</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link 3</a>
            </li>
          </ul>
        </div>
      </nav>
      <h1>Ozbargain Deals</h1>
      <ul>
        {this.state.data.map((data,i) =>
            <li key={i}>
              <div className="row">
                <div className="col-xs">
                <img src="https://sgwlawfirm.com/wp-content/plugins/lawyer-helper/assets/img/placeholder-category.png" alt="deal-node" height="50vw" width="50vw"/>
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
