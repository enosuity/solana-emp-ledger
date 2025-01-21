import React, { useState } from 'react';
import { generateRandomAddress } from '../utils/keypair';
import { sendTransaction } from '../utils/transactions';

const SalaryForm = ({ wallet, setWallet }) => {
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState('');
    const [transactionId, setTransactionId] = useState('');

    // Function to generate a random address
    const handleGenerateAddress = () => {
        const randomAddress = generateRandomAddress();
        setAddress(randomAddress);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!wallet || !wallet.publicKey) {
            alert('Please connect your wallet first!');
            return;
        }

        if (!salary || isNaN(parseFloat(salary)) || parseFloat(salary) <= 0) {
            alert('Please enter a valid salary amount greater than 0!');
            return;
        }

        try {
            const amount = parseInt(salary, 10); // Convert salary to an integer
            const txId = await sendTransaction(wallet, address, amount);
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
            if (window.solana) {
                const response = await window.solana.connect();
                setWallet(response); // Store wallet instance in state
            } else {
                alert('Phantom wallet not found. Please install it first.');
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            alert('Wallet connection failed!');
        }
    };

    return (
        <div>
            {!wallet ? (
                <div>
                    <button onClick={connectWallet}>Connect Wallet</button>
                    <p>If you don't have a wallet, install Phantom wallet first.</p>
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
                            placeholder="Enter salary in SOL"
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
