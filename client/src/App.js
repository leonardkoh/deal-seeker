import React from 'react';
import './App.css';

class App extends React.Component {
  state = { data: [] };

  componentDidMount() {
    fetch(`/ozb`)
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }
  
  render() {
    return (
    <div className="App">
      <h1>Data</h1>
      <ul>
        {this.state.data.map( d =>
          <li>
            {d.title}<br/>
            {d.submitDetail}<br/>
            <a href={d.link}>{d.link}</a><br/>
          </li>
        )}
      </ul> 
    </div>
  )}
}

export default App;
