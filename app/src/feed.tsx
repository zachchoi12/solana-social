import React, { createContext, useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js'
import { authorFilter, fetchPosts, topicFilter } from './api/fetch-posts';
import { Post } from './api/models';
import { Filter } from './filter';
import { Input } from './input';
import { MainContext } from './main';
import { EditModal } from './edit-modal';

export const FeedContext: any = createContext(null);

export const Feed = () => {
    const { workspace }: any = useContext(MainContext);
    const [feed, setFeed] = useState<Post[]>([]);
    const [filterAddress, setFilterAddress] = useState('');
    const [filterMyPosts, setFilterMyPosts] = useState(false);
    const [filterTopic, setFilterTopic] = useState('');
    const [edit, setEdit] = useState<PublicKey>(PublicKey.default);
    useEffect(() => {
        if (Object.keys(workspace).length === 0) return;
        const filters: any = [];
        if (workspace.wallet && filterMyPosts) {
            filters.push(authorFilter(workspace.wallet?.publicKey.toBase58()));
        }
        else if (filterAddress !== '') {
            filters.push(authorFilter(filterAddress));
        }
        if (filterTopic !== '') {
            filters.push(topicFilter(filterTopic));
        }
        fetchPosts(workspace.program, filters).then(response => {
            response.sort((a: Post, b: Post) => b.timestamp - a.timestamp);
            setFeed(response);
        });
    }, [workspace, filterAddress, filterMyPosts, filterTopic]);
    return (
        <div className='py-[1%]'>
            <FeedContext.Provider value={{ feed: { feed, setFeed }, address: { filterAddress, setFilterAddress }, posts: { filterMyPosts, setFilterMyPosts }, topic: { filterTopic, setFilterTopic }, edit: { edit, setEdit } }}>
                <Input/>
                <Filter/>
                { edit !== PublicKey.default && <EditModal/> }
                <ul role='list' className='divide-y divide-gray-200'>
                    { feed.map((item: Post, index: number) => (
                        <li className='relative bg-white py-5 px-4 hover:bg-gray-50' key={ index }>
                            <div className='flex justify-between space-x-3'>
                                <div className='min-w-0 flex-1'>
                                    <a href='#' onClick={() => setFilterAddress(item.author_display)}><p className='text-xl font-medium text-gray-900 truncate'>{ item.author_display }</p></a>
                                    {  item.topic && <a href='#' onClick={() => setFilterTopic(item.topic)}><p className='text-sm text-gray-500 truncate'>#{ item.topic }</p></a> }
                                </div>
                                { workspace && workspace.wallet && workspace.wallet?.publicKey.toBase58() === item.author_display && <a href='#' onClick={() => setEdit(item.publicKey)}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg></a> }
                                <time dateTime={ item.created_at } className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'>{ item.created_ago }</time>
                            </div>
                            <div className='mt-1'>
                                <p className='line-clamp-2 text-lg text-gray-600'>{ item.content }</p>
                            </div>
                        </li>
                    )) }
                </ul>
            </FeedContext.Provider>
        </div>
    )
}