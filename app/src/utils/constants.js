import idl from '../pages/idl/mysolanaapp.json';
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";

export const commitmentLevel = 'processed';
export const endpoint = process.env.REACT_APP_RPC_URL || clusterApiUrl("devent");
export const connection = new Connection(endpoint, commitmentLevel);

export const programId = new PublicKey(idl.address);
export const programInterface = JSON.parse(JSON.stringify(idl));

