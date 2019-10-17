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
        // todo: handle active link
        let activeLink = "nav-link active";
        
        return (
            // todo: re-style for mobile > drop down 
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <a className="navbar-brand">Deal Seeker</a> 

                <div classame="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            
                        // todo: refactor as loop for option elements, implement active value
                        }
                        <li className="nav-item">
                            <option className={activeLink} onClick={this.handleClick} value="/ozb">Oz Bargain</option>
                        </li>
                        <li className="nav-item">
                            <option className={"nav-link"} onClick={this.handleClick} value="/ffeeds">Frugal Feeds</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/ddeals">Decent Deals</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/groupon">Groupon</option>
                        </li>
                        <li className="nav-item">
                            <option className="nav-link" onClick={this.handleClick} value="/scoopon">Scoopon</option>
                        </li>
                    </ul>
                </div> 
                

            </nav>
        )}
    }

export default Headerbar;