import React from 'react'

class Pagination extends React.Component {
    constructor(props) {
        super(props)

        this.state = { activePage: 1 } 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({activePage: [e.target.value]});
        console.log(`page value: ${e.target.value}`);
    }

    render() {
        return (
            <nav aria-label="page-selector">
                <ul className="pagination justify-content-center">
                <li className="page-item active" id="Page1">
                    <button className="page-link" value={1} onClick={this.handleClick}>1</button>
                </li>
                <li className="page-item" id="Page2">
                    <button className="page-link" value={2} onClick={this.handleClick}>2</button>
                </li>
                <li className="page-item" id="Page3">
                    <button className="page-link" value={3} onClick={this.handleClick}>3</button>
                </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination;