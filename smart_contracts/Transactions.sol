// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {

    struct Transfer {
        address from;
        address to;
        uint amt;
        string memo;
        uint256 timestamp;
    }

    Transfer[] transfers;
    uint public count = 0;

    function performTransfer(address payable _to, string memory _message) public payable {
        transfers.push(Transfer(msg.sender, _to, msg.value, _message, block.timestamp));
        count++;

        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Transaction failed!!");
    }

    function fetchTransactions() public view returns(Transfer[] memory) {
        return transfers;
    }
}

