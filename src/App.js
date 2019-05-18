import React from "react";

import GuestAdder from "./GuestAdder";
import SomeGuest from "./SomeGuest";
import GuestFilter from "./GuestFilter";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            GuestState: JSON.parse(localStorage.Guests || '[]'),
            GuestFiltered: null
        };
        this.handlePairChange = this.handlePairChange.bind(this);
        this.handleGuestAdd = this.handleGuestAdd.bind(this);
        this.handleGuestDelete = this.handleGuestDelete.bind(this);
        this.handleSetFilter = this.handleSetFilter.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleTextBlur = this.handleTextBlur.bind(this);
    }

    handlePairChange(id) {
        this.setState(prevState => {
            const updatedPairs = prevState.GuestState.map(guest => {
                if (guest.id === id) {
                    guest.pair = !guest.pair;
                }
                return guest;
            });
            localStorage.Guests = JSON.stringify(updatedPairs);
            return {
                GuestState: updatedPairs
            };
        })
    }

    handleGuestAdd(text) {
        this.setState(prevState => {
            const updatedList = prevState.GuestState;
            updatedList.push({
                id: prevState.GuestState.length + 1,
                name: text,
                pair: false
            });
            localStorage.Guests = JSON.stringify(updatedList);
            return {
                GuestState: updatedList
            };
        })
    }

    handleGuestDelete(id) {
        this.setState(prevState => {
            const updatedList = prevState.GuestState;
            updatedList.splice(id-1, 1);
            const updatedId = updatedList.map((guest, index) => {
                guest.id = index + 1;
                return guest;
            })
            localStorage.Guests = JSON.stringify(updatedId);
            return {
                GuestState: updatedId
            };
        })
    }

    handleSetFilter(filter) {
        switch (filter) {
            case "With pairs":
                this.setState(prevState => {
                    const filtered = prevState.GuestState.filter(guest => {
                        return guest.pair;
                    })
                    return {GuestFiltered: filtered};
                });
                break;

            case "Without pairs":
                this.setState(prevState => {
                    const filtered = prevState.GuestState.filter(guest => {
                        return !guest.pair;
                    })
                    return {GuestFiltered: filtered};
                });
                break;

            case "All":
                this.setState({GuestFiltered: null});
                break;

            default:
                this.setState({GuestFiltered: null});
        }
    }


    handleDoubleClick(id, name) {
        document.getElementById(id).style.display="none";
        document.getElementById(name).style.display="";
        document.getElementById(name).focus();
    }

    handleTextBlur(id, name, text) {
        if (text === "") {
            this.handleGuestDelete(id);
        } else {
            this.setState(prevState => {
                const updatedName = prevState.GuestState.map(guest => {
                    if (guest.id === id) {
                        guest.name = text;
                    }
                    return guest;
                });
                localStorage.Guests = JSON.stringify(updatedName);
                return {
                    GuestState: updatedName
                };
            })
        }
        document.getElementById(id).style.display="";
        document.getElementById(name).style.display="none";
    }

    render() {
        const total = this.state.GuestState.length + this.state.GuestState.filter(item => item.pair).length;

        let guests;

        if (this.state.GuestFiltered) {
            guests = this.state.GuestFiltered.map( item => <SomeGuest
                key={item.id}
                guest={item}
                handlePairChange={this.handlePairChange}
                handleGuestDelete={this.handleGuestDelete}
                handleDoubleClick={this.handleDoubleClick}
                handleTextBlur={this.handleTextBlur}
                /> )
        } else {
            guests = this.state.GuestState.map( item => <SomeGuest
                key={item.id}
                guest={item}
                handlePairChange={this.handlePairChange}
                handleGuestDelete={this.handleGuestDelete}
                handleDoubleClick={this.handleDoubleClick}
                handleTextBlur={this.handleTextBlur}
                /> )
        }

        return (
            <div className="party-hard">
                <GuestAdder 
                    handleGuestAdd={this.handleGuestAdd}
                />
                <GuestFilter 
                    handleSetFilter={this.handleSetFilter}
                />
                {guests}
                <p>Total guests: {total}</p>
            </div>
        )
    };
};

export default App;