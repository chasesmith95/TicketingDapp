import Web3 from 'web3';


var TicketingABI = [{ "contract_name": "Ticketing", "abi": [ { "constant": false, "inputs": [ { "name": "_name", "type": "bytes32" } ], "name": "addBureau", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "tID", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "ticketID", "type": "uint256" } ], "name": "PayTicket", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "bureau", "type": "address" } ], "name": "unverifyBureau", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "bureau", "type": "address" } ], "name": "verifyBureau", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" }, { "name": "_criminal", "type": "bytes32" } ], "name": "makeTicket", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "identifications", "type": "bytes32" } ], "name": "getTickets", "outputs": [ { "name": "", "type": "uint256[]" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "payable": false, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "Pending", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "Paid", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "Unpaid", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "NotGuilty", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "cop", "type": "address" } ], "name": "Added", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "cop", "type": "address" } ], "name": "Verified", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "cop", "type": "address" } ], "name": "Unverified", "type": "event" } ], "unlinked_binary": "0x6060604052341561000f57600080fd5b5b600060055560048054600160a060020a03191633600160a060020a03161790555b5b610862806100416000396000f300606060405236156100805763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166301aaf23381146100935780631540f78a146100ab578063371cb8be146100d057806354258fc6146100dd578063787b305a146100fe578063e0337cdb1461011f578063f44ba7341461013a575b341561008b57600080fd5b5b600080fd5b005b341561009e57600080fd5b6100916004356101a4565b005b34156100b657600080fd5b6100be6102bc565b60405190815260200160405180910390f35b6100916004356102c2565b005b34156100e857600080fd5b610091600160a060020a0360043516610415565b005b341561010957600080fd5b610091600160a060020a03600435166104d5565b005b341561012a57600080fd5b6100916004356024356105ac565b005b341561014557600080fd5b61015060043561074a565b60405160208082528190810183818151815260200191508051906020019060200280838360005b838110156101905780820151818401525b602001610177565b505050509050019250505060405180910390f35b33600160a060020a038116600090815260016020526040902054156101c857600080fd5b60606040519081016040908152838252600160a060020a03331660208084018290526000838501819052918252600190522081518155602082015160018201805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055604082015160019091018054911515740100000000000000000000000000000000000000000274ff000000000000000000000000000000000000000019909216919091179055507fdcfefddfe354ab15def7a2a6a8758e2ad4100c920318c627db94e29d833e156733604051600160a060020a03909116815260200160405180910390a15b5b5050565b60055481565b600081815260036020526040902054819015156102de57600080fd5b8160025b60008281526003602081905260409091206001015460ff169081111561030457fe5b1461030e57600080fd5b600083815260036020526040902054348190101561032b57600080fd5b60008481526003602081905260409182902080549101549091600160a060020a039091169082156108fc0290839051600060405180830381858888f19350505050151561037757600080fd5b60008581526003602052604090206001908101805460ff191682805b02179055507f581d416ae9dff30c9305c2b35cb09ed5991897ab97804db29ccf92678e9531608560405190815260200160405180910390a15b803411156104095733600160a060020a03166108fc8234039081150290604051600060405180830381858888f19350505050151561040957600080fd5b5b5b505b505b505b5050565b6004543390600160a060020a0380831691161461043157600080fd5b600160a060020a0382166000908152600160205260409020548290151561045757600080fd5b600160a060020a03831660009081526001602081905260409182902001805474ff0000000000000000000000000000000000000000191690557fbf40ed975ac04192dc3c221b21155d52ba4322b78f63a7bd22c828bf2d3f6c8c90849051600160a060020a03909116815260200160405180910390a15b5b505b5050565b6004543390600160a060020a038083169116146104f157600080fd5b600160a060020a0382166000908152600160205260409020548290151561051757600080fd5b600160a060020a03831660009081526001602081905260409182902001805474ff00000000000000000000000000000000000000001916740100000000000000000000000000000000000000001790557f6a6455914f452787eb3985452aceedc1000fb545e394eb3b370e3d08958e0a5b90849051600160a060020a03909116815260200160405180910390a15b5b505b5050565b33600160a060020a03811660009081526001602052604090205415156105d157600080fd5b33600160a060020a0381166000908152600160208190526040909120015474010000000000000000000000000000000000000000900460ff16151561061557600080fd5b60a06040519081016040528481526020810160005b81526005546020808301829052600160a060020a03331660408085019190915260609093018790526000918252600390522081518155602082015160018083018054909160ff199091169083600381111561068157fe5b021790555060408201518160020155606082015160038201805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039290921691909117905560808201516004909101555060008381526002602052604090208054600181016106ee83826107d9565b916000526020600020900160005b50600554908190557f4e2c5ab35c5a6c864cb37f0d4b556e39e83aa85e744306ad9fd3ad7cc933028b915060405190815260200160405180910390a16005805460010190555b5b505b505050565b610752610803565b6000828152600260205260408120548391901161076e57600080fd5b6000838152600260209081526040918290208054909290918281020190519081016040528092919081815260200182805480156107ca57602002820191906000526020600020905b8154815260200190600101908083116107b6575b505050505091505b5b50919050565b81548183558181151161040f5760008381526020902061040f918101908301610815565b5b505050565b60206040519081016040526000815290565b61083391905b8082111561082f576000815560010161081b565b5090565b905600a165627a7a72305820bdb9bc92b7fd7c5fa1a4938a1aa51bb86e12d0f18abe6debbe737795bb71bc3b0029", "networks": { "1506689370009": { "events": { "0x4e2c5ab35c5a6c864cb37f0d4b556e39e83aa85e744306ad9fd3ad7cc933028b": { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "Pending", "type": "event" }, "0x581d416ae9dff30c9305c2b35cb09ed5991897ab97804db29ccf92678e953160": { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "Paid", "type": "event" }, "0xe56930cb57a157649edf1e17ce3b57957899f875af821456294818feeba621c3": { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "Unpaid", "type": "event" }, "0x05e4978d8c972d93aa1d4dd4a8f7bea2348175cdfec90b69d640596711068af7": { "anonymous": false, "inputs": [ { "indexed": false, "name": "_tID", "type": "uint256" } ], "name": "NotGuilty", "type": "event" }, "0xdcfefddfe354ab15def7a2a6a8758e2ad4100c920318c627db94e29d833e1567": { "anonymous": false, "inputs": [ { "indexed": false, "name": "cop", "type": "address" } ], "name": "Added", "type": "event" }, "0x6a6455914f452787eb3985452aceedc1000fb545e394eb3b370e3d08958e0a5b": { "anonymous": false, "inputs": [ { "indexed": false, "name": "cop", "type": "address" } ], "name": "Verified", "type": "event" }, "0xbf40ed975ac04192dc3c221b21155d52ba4322b78f63a7bd22c828bf2d3f6c8c": { "anonymous": false, "inputs": [ { "indexed": false, "name": "cop", "type": "address" } ], "name": "Unverified", "type": "event" } }, "links": {}, "address": "0xf85a8a8a2767d3cbbd1a67292faf74a44d515e05", "updated_at": 1506691318304 } }, "schema_version": "0.0.5", "updated_at": 1506692295505 }]

var TicketingAddress = "0x6a6a6f6ff25187e31c89e22612d45e27c5850be5";
const web3 =
new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));

const ticketingContract = web3.eth.contract(TicketingABI).at(TicketingAddress);

var blockNum = web3.eth.blockNumber;

export{ticketingContract, TicketingAddress, blockNum};