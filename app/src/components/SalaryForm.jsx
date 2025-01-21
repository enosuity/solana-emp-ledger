import React, { useState, useEffect } from 'react';
import { generateRandomAddress } from '../utils/keypair';
import { sendTransaction } from '../utils/transactions';

const SalaryForm = ({ wallet, setWallet }) => {
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState('');
    const [transactionId, setTransactionId] = useState('');

    // Function to generate a random address (for demo purposes)
    const handleGenerateAddress = () => {
        const randomAddress = generateRandomAddress();
        setAddress(randomAddress);
    };

    // Function to handle submitting the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!wallet || !wallet.publicKey) {
            alert('Please connect your wallet first!');
            return;
        }
        try {
            const txId = await sendTransaction(wallet, address, parseInt(salary) * 1e9); // Convert SOL to lamports
            setTransactionId(txId);
            alert('Transaction successful! ID: ' + txId);
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed!');
        }
    };

    // Wallet connection logic
    const connectWallet = async () => {
        try {
            if (window.solana && window.solana.isPhantom) {
                const response = await window.solana.connect();
                console.log('Wallet connected:', response.publicKey.toString());
                setWallet(window.solana); // Save the wallet instance
            } else {
                alert('Phantom wallet not found. Please install it.');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Failed to connect wallet.');
        }
    };

    // Effect to check if wallet is connected
    useEffect(() => {
        if (!wallet) {
            console.log('No wallet connected');
        } else {
            console.log('Wallet is connected:', wallet.publicKey ? wallet.publicKey.toString() : 'No public key');
        }
    }, [wallet]);

    return (
        <div>
            {!wallet ? (
                <div>
                    <button onClick={connectWallet}>Connect Wallet</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Address:</label>
                        <input type="text" value={address} readOnly />
                        <button type="button" onClick={handleGenerateAddress}>
                            Generate New Address
                        </button>
                    </div>
                    <div>
                        <label>Salary:</label>
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit Transaction</button>
                </form>
            )}
            {transactionId && (
                <p>
                    Transaction successful! ID: <code>{transactionId}</code>
                </p>
            )}
        </div>
    );
};

export default SalaryForm;
