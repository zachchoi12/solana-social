import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js'
import idl from './idl/solana_social.json';
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Program, Wallet, Idl, AnchorProvider } from '@project-serum/anchor';
import { Transaction, Keypair } from "@solana/web3.js";

export const useWorkspace = (): any => {
    const DUMMY_WALLET = {
        async signTransaction(tx: Transaction) {
            return tx;
        },
        async signAllTransactions(txs: Transaction[]) {
            return txs;
        },
        publicKey: Keypair.generate().publicKey,
     };
    const [workspace, setWorkspace] = useState({});
    const programID = new PublicKey(idl.metadata.address);
    const wallet = useAnchorWallet();
    //const connection = new Connection('http://127.0.0.1:8899');
    const connection = new Connection('https://api.devnet.solana.com', 'processed');
    // const connection = new Connection('https://api.mainnet-beta.solana.com', 'processed');
    let provider: AnchorProvider;
    let program: Program;
    useEffect(() => {
        provider = new AnchorProvider(connection, wallet as Wallet || DUMMY_WALLET, {
            commitment: 'processed',
            preflightCommitment: 'processed',
        });
        program = new Program(idl as Idl, programID, provider);
        setWorkspace({
            wallet,
            connection,
            provider,
            program,
        });
    }, [wallet]);
    return workspace;
};