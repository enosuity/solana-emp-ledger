Salary Management Project using solana with anchor framework:
Formate:->
1. Connect a Phantom wallet to our web3 app
2. Store Address and Salary from our Solana program using RPC API
3. Perform transaction 

# Set up an application for this project:
1. anchor init mysolanaapp
2. cd mysolanaapp

# After that you can run commands:
1. anchor build
2. anchor deploy

# Now set up our frontend part:
1. npx create-react-app app    // This can install the files inside app folder which is used for frontend.
2. cd app
3. npm install
4. npm install @project-serum/anchor @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui
@solana/wallet-adapter-wallets @solana/wallet-adapter-base

# To eventually connect to our Solana program, we need to add the IDL files that were generated when we ran "anchor build"
1. cp -r ../target/idl ./pages/idl

# After setup all these ... 
1. npm start


   
