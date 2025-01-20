// keypairUtils.js
import { Keypair } from "@solana/web3.js";

// Function to generate a random Solana keypair
export const generateRandomKeypair = () => {
  const keypair = Keypair.generate();
  return keypair;
};
