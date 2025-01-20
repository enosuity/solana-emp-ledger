// initializeProgram.js
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import idl from '../idl.json'; // Ensure correct path
import { generateRandomKeypair } from './keypairUtils'; // Import the keypair generation function

export const initializeProgram = async () => {
  try {
    const network = "http://127.0.0.1:8899"; // Local test validator
    const connection = new Connection(network, "confirmed");

    console.log("Connection established:", connection);

    // Ensure Phantom wallet is connected
    const wallet = window.solana;
    if (!wallet || !wallet.publicKey) {
      console.error("Wallet is not connected.");
      return null;
    }

    // Set up Anchor provider
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    console.log("Provider initialized", provider);

    // Define program ID
    const programId = new PublicKey("6PMijRajWR4SCmtscLSefMV2AqLx2JV5ii5xa7GQBkL1");
    const program = new Program(idl, programId, provider);
    console.log("Program initialized:", program);

    // Generate a new random account using the separate utility function
    const newAccount = generateRandomKeypair();
    const newAccountPublicKey = newAccount.publicKey;
    const signerPublicKey = wallet.publicKey;

    // Build the transaction
    const transaction = new Transaction().add(
      program.instruction.initialize(new BN(100), {
        accounts: {
          newAccount: newAccountPublicKey, // New account's public key
          signer: signerPublicKey, // Signer (wallet public key)
          systemProgram: SystemProgram.programId, // System program (for creating accounts)
        },
      })
    );

    // Send and confirm the transaction
    const txHash = await provider.sendAndConfirm(transaction, [newAccount]);
    console.log("Transaction successful with hash:", txHash);
    return program;
  } catch (error) {
    console.error("Error initializing program or sending transaction:", error);
    return null;
  }
};

export {generateRandomKeypair}