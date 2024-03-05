import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { CONTACT_ABI, CONTACT_ADDRESS } from './config';

function App() {

  const [account, setAccount] = useState(null);
  const [contactList, setContactList] = useState();
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
    async function load(){
      try{
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = await accounts[0];
        setAccount(account);
        

      }catch(e){

      }
    }
    load();
  }, []);

  useEffect(() => {
    if(account != null){

      // contract.methods.checkAddress().call().then(res => console.log(res));
      // contract.methods.count().call().then(res => {
      //   for (var i = 1; i <= res; i++) {
      //     // call the contacts method to get that particular contact from smart contract
      //     contract.methods.contacts(i).call().then(contact =>  setContacts((contacts) => [...contacts, contact]));
      //     // add recently fetched contact to state variable.
      
      //   }
      // })
      // iterate through the amount of time of counter
    }
  }, [account]);

  async function sendTxt(){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
    const addresses = await web3.eth.getAccounts();
    await contract.methods.sendEther().send({
      from:addresses[0],
      value:'1000000000000000000',
    });
  }

  console.log(contacts);
  return (
    <div>
        {`Some account: ${account}`}
        <button onClick={() => sendTxt()}>Send transaction</button>
    </div>
  );
}

export default App;
