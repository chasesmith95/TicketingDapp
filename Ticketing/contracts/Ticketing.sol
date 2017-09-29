pragma solidity ^0.4.4;


contract Ticketing {
    //should only be one contract
    bool exist;
		mapping(address => Bureau) bureaus; // for address to bureau
    mapping(bytes32 => uint[]) ticketIDs; // for address to tickets (multiple) (I am hoping to conserve space)
		mapping(uint => Ticket) tickets;
    //bureaList could be useful
		address owner;
		/* Add a variable called skuCount to track the most recent sku # */
    uint public tID;
		enum Status {Pending, Paid, Unpaid, NotGuilty}

		//acts as the overarching police/finer admin account
		struct Bureau {
        bytes32 name;
        address bureau;
				bool isVerified;
    }

		struct Ticket {
			uint amount; //could be an issue later on if it gets too big
			Status status;
			uint ticketID;
			address cop; //must be unique
			bytes32 criminal; //some piece of information given in a traffic stop Drivers License/State/Country;
		}

    //events
			//For the Tickets
    event Pending(uint _tID);
    event Paid(uint _tID);
    event Unpaid(uint _tID);
    event NotGuilty(uint _tID);
			//For the Bureaus (might deal with this later)
		event Added(address cop);
		event Verified(address cop);
		event Unverified(address cop);


    //modifiers
			//For Tickets
	  modifier isTicket(uint a) {require(tickets[a].amount != 0); _;} //checking existence in a mapping
    modifier canPay(uint _amount) { require(msg.value >= _amount); _; }  //can pay the ticket
    modifier correctAmount(uint _amount) {_; if (msg.value > _amount) msg.sender.transfer(msg.value - _amount); } //refund
    modifier isUnpaid(uint ticketID) {require(tickets[ticketID].status == Status.Unpaid); _; } //ensure that the person must pay the ticket

			//For Bureau and Owner
		modifier isOwner(address a) {require(a == owner); _;}
		modifier isBureau(address a) {require(bureaus[a].name != ""); _;} //checking existence in a mapping
		modifier notBureau(address a) {require(bureaus[a].name == ""); _;}
		modifier isVerified(address a) {require(bureaus[a].isVerified); _;}

		//For Crim
		modifier hasTickets(bytes32 b) {require(ticketIDs[b].length > 0); _;}


		function Ticketing() { //modifier here for has been created
        tID = 0;
				owner = msg.sender; //owner
    }

		//For Anyone TODO
    function addBureau(bytes32 _name)
		notBureau(msg.sender) {
				bureaus[msg.sender] = Bureau({name: _name,
					bureau: msg.sender,
					isVerified: false});
				Added(msg.sender);
    }

		//For Criminals (lolz)
		function PayTicket(uint ticketID) payable
		isTicket(ticketID)
		isUnpaid(ticketID)
		canPay(tickets[ticketID].amount)
		correctAmount(tickets[ticketID].amount) {
        tickets[ticketID].cop.transfer(tickets[ticketID].amount); //pay the ticket balance to cop address
        tickets[ticketID].status = Status.Paid; //set status of ticket
        Paid(ticketID); //event ticket paid
    }

		function getTickets(bytes32 id) hasTickets(id) constant returns (uint[]) {
        return ticketIDs[id];
    }

    function getTicket(uint i) isTicket(i)  constant returns (uint amount, Status status, uint ticketID, address cop, bytes32 criminal)  {
      return (tickets[i].amount, tickets[i].status, tickets[i].ticketID, tickets[i].cop, tickets[i].criminal);
    }

		//For Bureaus
		function makeTicket(uint _amount, bytes32 _criminal) isBureau(msg.sender) isVerified(msg.sender) { //must be Bureau
			tickets[tID] = Ticket({
				criminal: _criminal,
        cop: msg.sender,
				ticketID: tID,
        amount:_amount,
        status: Status.Unpaid});
      ticketIDs[_criminal].push(tID); //could be an issue here
		  Pending(tID);
		  tID = tID + 1;
    }
/*
    function getBureau(address a) isBureau(a) constant returns (Bureau)  {
      return bureaus[a];
    }
/*
    function getBureaus() constant returns () {
      return
    }
    */

    function getOwner() constant returns (address) {
      return owner;
    }
		//For Oracle/Owner for now
		function verifyBureau(address bureau) isOwner(msg.sender) isBureau(bureau) {
			bureaus[bureau].isVerified = true;
			Verified(bureau);
		}

    function verifyBureau() isOwner(msg.sender) isBureau(msg.sender) {
      bureaus[msg.sender].isVerified = true;
			Verified(msg.sender);
    }

		function unverifyBureau(address bureau) isOwner(msg.sender) isBureau(bureau) {
			bureaus[bureau].isVerified = false;
			Unverified(bureau);
		}

		//the otherwise function
		function() {
			revert();
		}


}
