import React from "react";

class GuestAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        this.props.handleGuestAdd(this.state.text);
        this.setState({text: ''});
        event.preventDefault();
    }
    
    render() {
        return (
                <form 
                    onSubmit={this.handleSubmit} >
                    <input
                        className="Adder"
                        type="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="Enter guest name..."
                    />
                </form>
        )
    }
}

export default GuestAdder;