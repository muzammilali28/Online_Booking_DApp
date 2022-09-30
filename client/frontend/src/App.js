import './App.css';
import './input.css'
import Connection from "./components/MetaMaskConnection";
import AppointmentForm from "./components/AppointmentForm";
import { useState } from "react";
import { ethers } from "ethers";

function App() {

  // useEffect(() => {

  //   const CreatePDF = async () => {
  //     const response = await fetch("/pdfCreator", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json"
  //       },
  //       body: JSON.stringify({ Title: 'Sample Text', Description: 'It is just a sample text that I need to write to the file' })
  //     })
  //     const result = await response.json();

  //     console.log(result);
  //   }

  //   CreatePDF();
  // });
  

  const [connected, setConnected] = useState(false);
  const [AccAddress, setAccAddress] = useState();
  const [AccBalance, setAccBalance] = useState();

  const connectMetaMask = async () => {

    if (window.ethereum) {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccAddress(accounts[0]);
      console.log(accounts);

      const balance = await provider.getBalance(accounts[0]);
      const balanceInEther = ethers.utils.formatEther(balance);

      // window.ethereum.on('accountsChanged', function (accounts){

      //   selectedAccount = accounts[0];
  
      //   console.log(`Selected account changed to ${selectedAccount}`);
  
      // });

      setAccBalance(balanceInEther);

      console.log("Account connected is : ", AccAddress);
      console.log("Balance in ETH is : ", AccBalance);

      setConnected(true);
    }
    else {
      alert("MetaMask Extension Not Found!!!");
    }
  }

  return (
    <div className="App">
      {connected ? <AppointmentForm DialogCrossIcon={()=>{setConnected(false)}} /> : <Connection connectMetaMask={connectMetaMask} />}
    </div>
  );
}

export default App;
