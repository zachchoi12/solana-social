import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Header = () => {
    return (
        <div className='relative bg-white'>
            <div className='absolute inset-0 z-30 pointer-events-none' aria-hidden='true'></div>
                <div className='relative z-20'>
                    <div className='flex justify-between items-center px-4 py-5'>
                        <div>
                            <a href='#' className='flex'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-auto sm:h-10 fill-current text-phantom' viewBox='0 0 20 20' fill='none'>
                                    <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
                                    <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
                                </svg>
                            </a>
                        </div>
                        <div className='float-right'>
                            <WalletMultiButton />
                        </div>
                </div>
            </div>
        </div>
    );
};