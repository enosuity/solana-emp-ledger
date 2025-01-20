import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, Keypair, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import idl from '../idl.json'; // Ensure correct path

export const initializeProgram = async () => {
  try {
    // Setting up the network connection
    const network = "http://127.0.0.1:8899"; // Local test validator
    const connection = new Connection(network, "confirmed");

    // Log connection details
    console.log("Connection established:", connection);

    // Get the wallet (Phantom wallet in this case)
    const wallet = window.solana;
    if (!wallet.publicKey) {
      console.error("Wallet is not connected.");
      return null;
    }

    // Setup Anchor provider
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    console.log("Provider initialized", provider);

    // Program ID
    const programId = new PublicKey("6PMijRajWR4SCmtscLSefMV2AqLx2JV5ii5xa7GQBkL1");

    // Load the IDL
    const program = new Program(idl, programId, provider);
    console.log("Program initialized:", program);

    // Generate a new account keypair
    const newAccount = Keypair.generate();
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

// Function to generate a random Solana keypair
export const generateRandomKeypair = () => {
  const keypair = Keypair.generate();
  return keypair;
};
