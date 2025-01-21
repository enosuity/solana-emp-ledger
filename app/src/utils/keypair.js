import { Keypair } from '@solana/web3.js';

export function generateRandomAddress() {
    const keypair = Keypair.generate();
    return keypair.publicKey.toString();
}
