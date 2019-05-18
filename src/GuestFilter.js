import React from "react";

class GuestFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setFilter: "All"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({setFilter: event.target.value});
        this.props.handleSetFilter(event.target.value);
    }

    render() {
        
        return (
            <form className="Filter">
                <input
                    type="button"
                    value="All"
                    onClick={this.handleClick}
                />
                <input
                    type="button"
                    value="With pairs"
                    onClick={this.handleClick}
                />
                <input
                    type="button"
                    value="Without pairs"
                    onClick={this.handleClick}
                />
            </form>
        )
    }
}

export default GuestFilter;