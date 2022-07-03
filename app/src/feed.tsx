import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchPosts } from './api/fetch-posts';
import { Post } from './api/models';
import { Filter } from './filter';
import { Input } from './input';
import { MainContext } from './main';

export const FeedContext: any = createContext(null);

export const Feed = () => {
    const { workspace }: any = useContext(MainContext);
    const [feed, setFeed] = useState<Post[]>([]);
    const [filterAddress, setFilterAddress] = useState('');
    const [filterMyPosts, setFilterMyPosts] = useState(false);
    useEffect(() => {
        if (Object.keys(workspace).length === 0) return;
        fetchPosts(workspace.program).then(response => {
            response.sort((a: Post, b: Post) => b.timestamp - a.timestamp);
            setFeed(response);
        });
    }, [workspace]);
    const includePost = ((post: Post) => {
        setFeed(prev => [post, ...prev]);
    });
    return (
        <div className='py-[1%]'>
            <Input includePost={ includePost }/>
            <FeedContext.Provider value={{ address: { filterAddress, setFilterAddress }, posts: { filterMyPosts, setFilterMyPosts } }}>
                <Filter/>
            </FeedContext.Provider>
            <ul role='list' className='divide-y divide-gray-200 '>
                { feed.filter(item => {
                    // TODO: Make fetch using backend
                    if (workspace && workspace.wallet && filterMyPosts) {
                        return item.author_display === workspace.wallet?.publicKey.toBase58();
                    }
                    else {
                        return item.author_display.includes(filterAddress);
                    }
                }).map((item: Post, index: number) => (
                    <li className='relative bg-white py-5 px-4 hover:bg-gray-50' key={ index }>
                        <div className='flex justify-between space-x-3'>
                        <div className='min-w-0 flex-1'>
                            <a href='#' className='block focus:outline-none'>
                                <span className='absolute inset-0' aria-hidden='true'></span>
                                <p className='text-xl font-medium text-gray-900 truncate'>{ item.author_display }</p>
                                {  item.topic && <p className='text-sm text-gray-500 truncate'>#{ item.topic }</p> }
                            </a>
                        </div>
                            <time dateTime={ item.created_at } className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'>{ item.created_ago }</time>
                        </div>
                        <div className='mt-1'>
                            <p className='line-clamp-2 text-lg text-gray-600'>{ item.content }</p>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    )
}