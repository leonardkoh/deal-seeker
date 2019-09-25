import React from 'react'

class Headerbar extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        console.log(e.target.value);
        this.props.site(e.target.value);
    }

    render() {
        return (
            // re-style if mobile > drop down 
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <a className="navbar-brand">Deal Seeker</a> 

                {/* <div classame="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <option className="nav-link" onClick={this.handleClick} value="/ozb">Oz Bargain</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/ffeeds">Frugal Feeds</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/">Link 2</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/">Link 3</option>
                        </li>
                    </ul>
                </div> */}
                <div classame="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            
                        // use loop for option elements, make active element based on parent value
                            
                        }
                        <li className="nav-item active">
                            <option className="nav-link" onClick={this.handleClick} value="/ozb">Oz Bargain</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/ffeeds">Frugal Feeds</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/">Link 2</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/">Link 3</option>
                        </li>
                    </ul>
                </div> 
                

            </nav>
        )}
    }

export default Headerbar;