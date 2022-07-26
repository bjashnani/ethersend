import { ethers } from "ethers";
import { useState } from 'react';
import React from 'react';
import Greetings from './components/Greetings';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  
  const [walletAddr, setWalletAddr] = useState(null);
  const [connected, setConnected] = useState(null);
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "performTransfer",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fetchTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amt",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "memo",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct Transactions.Transfer[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contractAddr = '0xAD0598F984137189D0ea8369D174ED7b841A0F2f';
  
  const performXfer = async(e) => {
    e.preventDefault();
    var to_addr = e.target.elements.addr.value;
    var xfer_amt = e.target.elements.amt.value;
    var xfer_memo = e.target.elements.msg.value;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddr, contractABI, signer);

    var operation = await contract.performTransfer(to_addr, xfer_memo, {value: ethers.utils.parseEther(xfer_amt)});
    await operation.wait();
    console.log(operation);

    operation = await contract.fetchTransactions();
    console.log(operation);    

    operation = await contract.count();
    console.log(operation);
  }

  const connectWallet = async() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Wallet detected!');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setWalletAddr(account);
      setConnected(true);
      console.log(account);
    } else {
      console.log('Wallet is NOT available!');
    }
  }

  
  return (
  <div className="App">
  <header className="App-header">
    <Button onClick={connectWallet}>Connect Wallet</Button>
    <p></p>
    <Greetings connected={connected} walletAddr={walletAddr} />
    <p></p>
    <p></p>
    <Form name="xferEthForm" onSubmit={performXfer}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Recepient</span>
        <input type="text" className="form-control" placeholder="Address" name="addr" aria-label="address" aria-describedby="basic-addon1"></input>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Amount</span>
        <input type="text" className="form-control" placeholder="ETH" name="amt" aria-label="amount" aria-describedby="basic-addon1"></input>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Memo</span>
        <input type="text" className="form-control" placeholder="Message" name="msg" aria-label="message" aria-describedby="basic-addon1"></input>
      </div>
      <Button type="submit">Transfer</Button>
    </Form>
  </header>
  </div>
  );
}

export default App;

