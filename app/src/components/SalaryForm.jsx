import React, { useState, useEffect } from "react";
import { initializeProgram, generateRandomKeypair } from "../utils/anchorConfig";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import BN from "bn.js"; // Import BN from bn.js

const SalaryForm = () => {
  const [program, setProgram] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showWalletMessage, setShowWalletMessage] = useState(true); // State to control message visibility

  useEffect(() => {
    const initProgram = async () => {
      try {
        if (!window.solana) {
          console.error("No Solana provider found. Please install Phantom wallet.");
          return;
        }
        
        const wallet = window.solana;
        const connected = await wallet.connect(); // Ensure wallet is connected
        if (!connected) {
          console.error("Wallet not connected");
          return;
        }
  
        const programInstance = await initializeProgram();
        setProgram(programInstance);
  
        console.log("Program initialized:", programInstance); // Program instance should be logged here
  
        // Set the wallet address
        setWalletAddress(wallet.publicKey.toString());
  
      } catch (error) {
        console.error("Error initializing program:", error);
      }
    };
  
    initProgram();
  }, []);
  

  const handleGenerateAddress = () => {
    const keypair = generateRandomKeypair();
    setNewAddress(keypair.publicKey.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!program) {
      setMessage("Program is not initialized yet.");
      return;
    }
    if (!newAddress || !salary) {
      setMessage("Please generate an address and enter a salary.");
      return;
    }

    try {
    //   const connection = program.provider.connection;

      // Create a transaction
      const tx = await program.rpc.initialize(new BN(salary), {
        accounts: {
          newAccount: new PublicKey(newAddress), // Generated address
          signer: program.provider.wallet.publicKey, // Wallet address
          systemProgram: SystemProgram.programId, // System program
        },
        signers: [],
      });

      setMessage(`Transaction successful! Transaction ID: ${tx}`);
    } catch (error) {
      console.error("Error during transaction:", error);
      setMessage("Transaction failed. See console for details.");
    }
  };

  useEffect(() => {
    // If a wallet is connected or not, show the message for 3 seconds and then hide it
    if (walletAddress) {
      setShowWalletMessage(true);
      setTimeout(() => setShowWalletMessage(false), 3000);
    } else {
      setShowWalletMessage(true);
    }
  }, [walletAddress]);

  return (
    <div>
      <h2>Salary Form</h2>
      {showWalletMessage && (
        <p>{walletAddress ? "Wallet is Connected." : "Please connect your wallet."}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Generated Address:</label>
          <input
            type="text"
            value={newAddress}
            readOnly
            placeholder="Click 'Generate' to create an address"
          />
          <button type="button" onClick={handleGenerateAddress}>
            Generate Address
          </button>
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SalaryForm;
