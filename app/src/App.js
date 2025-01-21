import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import SalaryForm from './components/SalaryForm';

const App = () => {
    const [wallet, setWallet] = useState(null);

    return (
        <div>
            <ConnectWallet setWallet={setWallet} />
            {wallet && <SalaryForm wallet={wallet} />}
        </div>
    );
};

export default App;
