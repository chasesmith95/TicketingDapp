import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ticketingContract, ownerAddress, account, TicketingAddress} from './EthereumSetup';
var QRCode = require('qrcode.react');

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
    contract: ticketingContract
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(" ");
    var d = this.state.contract.getTicket(0);
    alert(d.toString());

    var data = this.state.contract.getTickets(this.state.value.toString());

    alert(" ");
    var keys = Array(data);
    alert(keys.length);
    var owner = String(this.state.contract.getOwner().toString());
    alert(owner);


    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}



class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
    value: '',
    contract: ticketingContract
    };


    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeValue(event) {
    this.setState({value: event.target.value});

  }

  handleSubmit(event) {
    this.state.contract.makeTicket(this.state.value, this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>ID
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          </p>
        </label>
        <label>
          <p>
          Fine
          <input type="number" value={this.state.value} onChange={this.handleChangeValue} />
          </p>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


class BureauForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
    address: '',
    ownerAddress: ownerAddress,
    contract: ticketingContract
    };


    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeAddress(event) {
    this.setState({address: event.target.value});

  }

  handleSubmit(event) {
    this.state.contract.addBureau.sendTransaction(this.state.name, {from: this.state.ownerAddress});
    alert("Success");
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>Name
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          </p>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticketingContract: ticketingContract,
            TicketingAddress: TicketingAddress,
            account: account,
            address: ownerAddress
        }
    }
  render() {
    return (
      <div className="App">
        <div className = "header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title white">Welcome to the Ticketing App</h1>
            <h4 className="App-intro white"><i>A decentralized approach to make citations and fines more efficient and easier. </i></h4>
        </div>

        <div className = "section">
          <h1 className="App-title blue">About</h1>
          <p className="section-text">The ticketing app is a new approach to fines and citations. Instead of having
          multiple sources of tickets and fines (e.g. library, police, ect) have one decentralized ecosystem to query and pay off
          tickets. </p>
        </div>

        <div className = "grey-section">
          <h1 className="App-title white">Getting Started</h1>
          <p className="section-text white">
          Organizations and government services can request to be added to the Accredited ticketing Bureaus.
          Simply Scan QR Code of Message Address and Input your organization name and you can be processed and verified.
          </p>
          <QRCode value={this.state.TicketingAddress} />
          <p className="section-text white"> {this.state.TicketingAddress} </p>
        </div>



        <div className = "section">
          <h1 className="App-title">Writing Tickets</h1>
          <p className="section-text">
          Once your organization has been verified. You can write tickets. It is advised to use
          License number, State and Country when writing tickets because it is an easy number that every
          individual has a unique copy of. For now we will input a test Organization. The owner is {this.state.address}.
          </p>
          <BureauForm />
        </div>


        <div className = "grey-section">
          <h1 className="App-title white">Create Your Own Ticket!</h1>
          <div>
            <TicketForm/>
          </div>
        </div>


        <div className = "section">
          <p className="section-text blue"> Now query the tickets to show your ticket!</p>
          <NameForm/>
       </div>

       <div className = "section">
         <div>
         </div>
       </div>

       <div className = "grey-section">
        <h1 className="App-title white">Pay Off A Ticket!</h1>
        <p className ="section-text white">
          Pay off tickets and see the results immediately. This becomes the one stop shop for
          citations, with an easy payment channel. Check out the Query of a Ticket belonging to "1111111111CAUS".
          If you are feeling generous you can pay this ticket by scanning the QR Code and Inputting
          the Amount Needed to Pay, as Well as the tickets Special uint in the data field.
        </p>
        <QRCode value={this.state.TicketingAddress} />
        <p className = "App-intro white"> {this.state.TicketingAddress} </p>
      </div>

      <div className = "grey-section">
        <div>
        </div>
      </div>

      <div className = "grey-section">
        <p className ="App-intro white">
          When the page refreshes we see that this ticket is now marked as paid.
        </p>
     </div>

     <div className = "footer">
     </div>
      </div>
    );
  }
}

export default App;
