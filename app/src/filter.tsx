import React, { useContext, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { FeedContext } from './feed';
import { MainContext } from './main';

export const Filter = () => {
    const { address, posts, topic } = useContext(FeedContext);
    const { workspace }: any = useContext(MainContext);
    const { connected } = useWallet();
    const addressChange = (event: any) => {
        address.setFilterAddress(event.target.value); 
    };
    const postChange = () => {
        posts.filterMyPosts ? address.setFilterAddress('') : address.setFilterAddress(workspace && workspace.wallet ? workspace.wallet?.publicKey.toBase58() : '');
        posts.setFilterMyPosts((prev: boolean) => !prev);
    };
    const topicChange = (event: any) => {
        topic.setFilterTopic(event.target.value);
    }
    useEffect(() => {
        if (!workspace || !workspace.wallet) {
            address.setFilterAddress('');
        }
    }, [workspace]);
    return (
        <div className='py-[1%]'>
            <div className='flex flex-row'>
                <div className='basis-2/5'>
                    <label htmlFor='address' className='sr-only'>Filter by address</label>
                    <input type='text' name='address' id='address' className='shadow-sm focus:ring-phantom focus:border-phantom block w-full sm:text-sm border-gray-300 rounded-md' placeholder='Filter by address (exact matches only)' value={ address.filterAddress } onChange={ addressChange } disabled={ posts.filterMyPosts }/>
                </div>
                <div className='basis-2/5 px-5'>
                    <label htmlFor='address' className='sr-only'>Filter by topic</label>
                    <input type='text' name='topic' id='topic' className='shadow-sm focus:ring-phantom focus:border-phantom block w-full sm:text-sm border-gray-300 rounded-md' placeholder='Filter by topic (exact matches only)' value={ topic.filterTopic } onChange={ topicChange }/>
                </div>
                <div className='basis-1/5'>
                    <label htmlFor='default-toggle' className='inline-flex relative items-center cursor-pointer float-right'>
                        <input type='checkbox' id='default-toggle' className='sr-only peer' onChange={ postChange } disabled={ !connected }/>
                        <div className='w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-phantom'></div>
                        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>My Posts</span>
                    </label>
                </div>
            </div>
        </div>
    )
};