import React, { useContext } from 'react';
import { MainContext } from './main';

export enum CreateNotificationType {
    success,
    failure,
    loading,
    none,
};

export const CreateNotification = () => {
    const { notification } = useContext(MainContext);
    const type = notification.notification;
    if (type === CreateNotificationType.none) {
        return <div></div>;
    }
    const success = <svg className='h-6 w-6 text-green-400' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' aria-hidden='true'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>;
    const failure = <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>;
    const loading = <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>;
    const successMessage = 'Successfully saved!';
    const failureMessage = 'Failure during save';
    const loadingMessage = 'Save in progress';
    const icon = type === CreateNotificationType.success ? success : type === CreateNotificationType.failure ? failure : loading;
    const message = type === CreateNotificationType.success ? successMessage : type === CreateNotificationType.failure ? failureMessage : loadingMessage;
    
    return (
        <div aria-live='assertive' className='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start' style={{ zIndex: 100 }}>
            <div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
                <div className='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
                <div className='p-4'>
                    <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                        { icon }
                    </div>
                    <div className='ml-3 w-0 flex-1 pt-0.5'>
                        <p className='text-sm font-medium text-gray-900'>{ message }</p>
                    </div>
                    <div className='ml-4 flex-shrink-0 flex'>
                        <button type='button' className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-phantom' onClick={() => notification.setNotification(CreateNotificationType.none)}>
                        <span className='sr-only'>Close</span>
                        <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                            <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
};