import React, { useState, useEffect } from "react";
import { initializeProgram, generateRandomKeypair } from "../utils/anchorConfig";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "@project-serum/anchor"; // Import BN from Anchor's package

const SalaryForm = () => {
  const [program, setProgram] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showWalletMessage, setShowWalletMessage] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initProgram = async () => {
      try {
        if (!window.solana) {
          console.error("No Solana provider found. Please install Phantom wallet.");
          setMessage("No Solana provider found.");
          return;
        }

        const wallet = window.solana;
        if (!wallet.isConnected) {
          await wallet.connect(); // Ensure wallet is connected
        }

        // Initialize the program
        const programInstance = await initializeProgram();
        if (programInstance) {
          setProgram(programInstance);
          console.log("Program initialized:", programInstance);
          setLoading(false);
        } else {
          console.error("Failed to initialize program.");
          setMessage("Failed to initialize program.");
        }

        setWalletAddress(wallet.publicKey.toString());
      } catch (error) {
        console.error("Error initializing program:", error);
        setMessage("Error initializing program.");
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

    if (loading) {
      setMessage("Program is still initializing...");
      return;
    }
    if (!program) {
      setMessage("Program is not initialized yet.");
      return;
    }
    if (!newAddress || !salary) {
      setMessage("Please generate an address and enter a salary.");
      return;
    }

    try {
      // Convert salary to BN (BigNumber)
      const salaryBN = new BN(salary);

      // Ensure newAccount is a valid PublicKey
      const newAccountPublicKey = new PublicKey(newAddress);

      // Create a transaction
      const tx = await program.rpc.initialize(salaryBN, {
        accounts: {
          newAccount: newAccountPublicKey, // Generated address
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
