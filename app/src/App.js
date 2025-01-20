import React from "react";
import ConnectWallet from "./components/ConnectWallet";
import SalaryForm from "./components/SalaryForm";

const App = () => {
  return (
    <div>
      <header>
        <ConnectWallet />
      </header>
      <main>
        <SalaryForm/>
      </main>
    </div>
  );
};

export default App;
