import React, { useState } from "react";
import styles from "./ConnectWallet.module.css";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        console.log("Connected to wallet:", response.publicKey.toString());
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("Install Phantom wallet!!!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    console.log("Disconnected your wallet.");
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {walletAddress ? "Your wallet is connected" : "Connect your Wallet"}
      </h1>
      <button
        className={styles.button}
        onClick={walletAddress ? disconnectWallet : connectWallet}
      >
        {walletAddress ? "Disconnect" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
