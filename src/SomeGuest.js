import React from "react";

class SomeGuest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.guest.name
        };
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleFormBlur = this.handleFormBlur.bind(this)
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }
    

    handleFormBlur(event) {
        this.props.handleTextBlur(this.props.guest.id, this.props.guest.name, this.state.text)
        event.preventDefault();
    }

    render() {
        return (
            <div className="SomeGuest">
                <form
                    onDoubleClick={() => this.props.handleDoubleClick(this.props.guest.id, this.props.guest.name)}
                    onSubmit={this.handleFormBlur}
                >
                    <p id={this.props.guest.id} style={{display: "inlay"}}>
                        {this.props.guest.name}
                    </p>
                    <input
                        id={this.props.guest.name}
                        type="text"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                        style={{display: "none"}}
                        onBlur={this.handleFormBlur}
                        
                    />
                </form>
                
                <input
                    type="checkbox"
                    checked={this.props.guest.pair}
                    onChange={() => this.props.handlePairChange(this.props.guest.id)}
                />Pair
                <input
                    type="button"
                    value="X"
                    onClick={() => this.props.handleGuestDelete(this.props.guest.id)}    
                />
            </div>
            
        )
    }
}

export default SomeGuest;