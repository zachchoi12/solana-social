import React, { useContext, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendPost } from './api/send-post';
import { MainContext } from './main';
import { FeedContext } from './feed';

export const Input = () => {
    const { workspace, notification }: any = useContext(MainContext);
    const { feed }: any = useContext(FeedContext);
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const { connected } = useWallet();
    const resetForm = () => {
        setContent('');
        setTopic('');
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoading(true);
        sendPost(workspace, topic, content, notification, resetForm).then((post) => {
            setLoading(false);
            feed.setFeed((prev: any) => [post, ...prev]);
        });
    };
    if (!connected) {
        return (
            <div className='px-8 py-4 bg-gray-50 text-gray-500 text-center border-b'>
                Connect your wallet to start tweeting...
            </div>
        );
    }
    return (
        <div className='flex items-start space-x-4 py-[1%]'>
            { connected && <div className='min-w-0 flex-1'>
                <form action='#' className='relative' onSubmit={handleSubmit}>
                    <div className='border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-phantom focus-within:ring-1 focus-within:ring-phantom'>
                        <label htmlFor='comment' className='sr-only'>What's happening?</label>
                        <textarea rows={2} name='comment' id='comment' className='block w-full py-3 border-0 resize-none focus:ring-0 sm:text-lg' placeholder="What's happening?" value={content} onChange={({target}) => setContent(target.value)}></textarea>
                        <div className='py-2' aria-hidden='true'>
                            <div className='py-px'>
                                <div className='h-9'></div>
                            </div>
                        </div>
                    </div>
                    <div className='absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between'>
                        <div className="absolute left-2 inset-y-0 flex pl-3 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input type='text' placeholder='topic' className='rounded-full pl-10 pr-4 py-2 bg-gray-100 border-none focus:ring-0' value={topic} onChange={({target}) => setTopic(target.value)}/>
                        <div className='flex items-center space-x-5'></div>
                        <div className='flex-shrink-0'>
                            <button type='submit' className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-phantom hover:bg-phantom-hover' disabled={loading}>Post</button>
                        </div>
                    </div>
                </form>
            </div> }
        </div>
    );
};