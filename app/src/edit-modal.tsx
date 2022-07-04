import React, { useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { FeedContext } from './feed';
import { getPost } from './api';
import { Post } from './api/models';
import { MainContext } from './main';

export const EditModal = () => {
    const { workspace }: any = useContext(MainContext);
    const { edit }: any = useContext(FeedContext);
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    useEffect(() => {
        if (Object.keys(workspace).length === 0) return;
        getPost(workspace.program, edit.edit).then((post: Post) => {
            setContent(post.content);
            setTopic(post.topic);
        })
    }, []);
    const handleCancel = () => {
        edit.setEdit(PublicKey.default);
    }
    return (
        <div className='relative z-10' role='dialog' aria-modal='true'>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
            <div className='fixed z-10 inset-0 overflow-y-auto'>
                <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
                <div className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full'>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div>
                        <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                            <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>Edit post</h3>
                        <div className='mt-2'>
                        <form action='#' className='relative'>
                            <div className='border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-phantom focus-within:ring-1 focus-within:ring-phantom'>
                                <label htmlFor='comment' className='sr-only'>What's happening?</label>
                                <textarea rows={3} name='comment' id='comment' className='block w-full py-3 border-0 resize-none focus:ring-0 sm:text-lg' placeholder="What's happening?" value={content} onChange={(event => setContent(event.target.value))}></textarea>
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
                                <input type='text' placeholder='topic' className='rounded-full pl-10 pr-4 py-2 bg-gray-100 border-none focus:ring-0' value={topic} onChange={(event => setTopic(event.target.value))}/>
                            </div>
                        </form>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                        <button type='button' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-phantom text-base font-medium text-white hover:bg-phantom-hover sm:ml-3 sm:w-auto sm:text-sm'>Save</button>
                        <button type='button' className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}