import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ticketingContract, TicketingAddress, blockNum} from './EthereumSetup';
var QRCode = require('qrcode.react');

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticketingContract: ticketingContract,
            blockNum: blockNum,
            TicketingAddress: TicketingAddress
        }
    }
  render() {
    return (
      <div className="App">
        <div className = "header">
            <p> Header with background image </p>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title blue">Welcome to the Ticketing App</h1>
            <h4 className="App-intro white"><i>A decentralized approach to make citations and fines more efficient and easier. </i></h4>
        </div>

        <div className = "section">
          <h1 className="App-title">About</h1>
          <p className="section-text">The ticketing app is a new approach to fines and citations. Instead of having
          people...</p>
        </div>

        <div className = "grey-section">
          <h1 className="App-title">Getting Started</h1>
          <p className="section-text">
          Organizations and government services can request to be added to the Accredited ticketing Bureaus.
          Simply Scan QR Code of Message Address and Input your organization name and you can be processed and verified.
          </p>
          <QRCode value={this.state.TicketingAddress} />
          <p> {this.state.TicketingAddress} </p>
        </div>


        <div className = "section">
          <h1 className="App-title">Writing Tickets</h1>
          <p className="section-text">
          Once your organization has been verified. You can write tickets. It is advised to use
          License number, State and Country when writing tickets because it is an easy number that every
          individual has a unique copy of.
          </p>
        </div>

        <div className = "grey-section">
          <h1 className="App-title">Create Your Own Ticket!</h1>
          <div>
            <p> Form for ticket </p>
          </div>
        </div>


        <div className = "section">
          <p className="App-intro">
          Query Tickets TODO
          </p>
       </div>

       <div className = "grey-section">
        <h1 className="App-title">Pay Off A Ticket!</h1>
        <p className ="section-text">
          Pay off tickets and see the results immediately. This becomes the one stop shop for
          citations, with an easy payment channel. Check out the Query of a Ticket belonging to "1111111111CAUS".
          If you are feeling generous you can pay this ticket by scanning the QR Code and Inputting
          the Amount Needed to Pay, as Well as the tickets Special uint in the data field.
        </p>
        <QRCode value={this.state.TicketingAddress} />
        <p className = "App-intro"> {this.state.TicketingAddress} </p>
      </div>

      <div className = "section">
        <p> Query Search Page </p>
        <div>
        <p> ListView for Query here </p>
        </div>
      </div>

      <div className = "grey-section">
        <p className ="App-intro">
          When the page refreshes we see that this ticket is now marked as paid.
        </p>
        <p> ListView for Query here </p>
     </div>

     <div className = "footer">
     </div>
      </div>
    );
  }
}

export default App;
