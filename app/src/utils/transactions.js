import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

export const sendTransaction = async (wallet, toAddress, amount) => {
    if (!wallet.publicKey) {
        throw new Error('Wallet not connected');
    }

    const destinationAddress = new PublicKey(toAddress);
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: destinationAddress,
            lamports: amount * 1000000000, // Convert salary to lamports (1 SOL = 10^9 lamports)
        })
    );

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    try {
        const txId = await wallet.sendTransaction(transaction, connection);
        await connection.confirmTransaction(txId, 'confirmed');
        return txId;
    } catch (error) {
        console.error('Transaction failed:', error);
        throw new Error('Transaction failed');
    }
};
