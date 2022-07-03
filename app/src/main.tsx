import React, { createContext, useState } from 'react';
import { Header } from './header';
import { Feed } from './feed';
import { Break } from './break';
import { useWorkspace } from './workspace';
import { Notification, NotificationType } from './notification';
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

export const MainContext: any = createContext(null);

export const Main = () => {
    const [notification, setNotification] = useState(NotificationType.none);
    return (
        <MainContext.Provider value={{ workspace: useWorkspace(), notification: { notification, setNotification} }}>
            <Notification/>
            <div className='px-[20%]'>
                <Header/>
                <Break/>
                <Feed/>
            </div>
        </MainContext.Provider>
    );
};