import React, { useState } from 'react'
import DashboardTemplate from 'components/templates/DashboardTemplate'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'

const allMessages = [
    {
        userid: '123123-12123',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 1,
        isOnline: true,
    },
    {
        userid: '123123-asdfa',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    },
    {
        userid: '123123-12e12d1w',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    },
    {
        userid: '123123-xccf',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    },
    {
        userid: '123123-v6765',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 1,
        isOnline: true,
    },
    {
        userid: '123123-xcf43478765',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg:
            'Olá, preciso de uma ajuda, Olá, preciso de uma ajuda, Olá, preciso de uma ajuda, Olá, preciso de uma ajuda, Olá, preciso de uma ajuda, Olá, preciso de uma ajuda, Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    },
    {
        userid: '123123-z5122zz',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    },
    {
        userid: '123123-z90z0z00z',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    },
    {
        userid: '123123-2l2l1l2l2',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    },
]

const selectedUserChat = [
    {
        message: 'Seja Bem-vindo ao suporte, como podemos ajudar você hoje?',
        time: '10:56',
        isRead: true,
        isOpponent: false,
    },
    {
        message: 'Olá, preciso de uma ajuda',
        time: '10:56',
        isRead: true,
        isOpponent: true,
    },
]

const Support = () => {
    const [selectedUser, setSelectedUser] = useState({
        userid: '123123-2l2l1l2l2',
        avatar: '',
        username: 'Italo Eduardo',
        lastMsg: 'Olá, preciso de uma ajuda',
        lastMsgTime: '10:58',
        newMsgCount: 0,
        isOnline: true,
    })
    return (
        <DashboardTemplate>
            <div className='font-base mb-5 text-center xs:text-left md:font-[32px]'>Suporte</div>
            <div className='divide-slate-30 grid w-full grid-cols-1 divide-x divide-solid divide-slate-200 md:grid-cols-2'>
                <div className='hidden rounded-[12px] bg-white md:block md:rounded-r-none md:rounded-l-[20px]'>
                    <div className='p-[12px] pl-1 text-base xs:pl-2 md:p-[20px] md:pl-3 md:text-[20px]'>
                        Todas Mensagens
                    </div>
                    <div className='flex flex-col divide-y divide-solid divide-slate-200'>
                        {allMessages.map(
                            ({ userid, avatar, username, lastMsg, lastMsgTime, newMsgCount }) => (
                                <div
                                    key={userid}
                                    className='flex items-center gap-x-2 p-1 xs:p-3 md:p-5'
                                >
                                    <div className='h-[50px] w-[50px] rounded-full bg-[#C4C4C4] md:h-[55px] md:w-[55px]'></div>
                                    <div className='flex max-w-[calc(100%-100px)] grow flex-col py-1 md:py-3'>
                                        <div className='text-[17px]'>{username}</div>
                                        <div className='text-[13px] text-[#888888]'>
                                            <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
                                                {lastMsg}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-[12px]'>{lastMsgTime}</div>
                                        {!!newMsgCount && (
                                            <div className='h-[25px] w-[25px] rounded-full bg-[#F3722C] text-center text-white'>
                                                {newMsgCount}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className='rounded-[12px] bg-white md:rounded-l-none md:rounded-r-[20px]'>
                    <div className='flex items-center gap-x-2 border-b border-slate-200 p-1 xs:p-3 md:p-7'>
                        <div className='h-[50px] w-[50px] rounded-full bg-[#C4C4C4] md:h-[55px] md:w-[55px]'></div>
                        <div className='flex max-w-[calc(100%-100px)] grow flex-col py-1 md:py-3'>
                            <div className='text-[17px]'>{selectedUser.username}</div>
                            <div className='text-[13px] text-[#888888]'>
                                {selectedUser.isOnline ? 'Online' : 'Offline'}
                            </div>
                        </div>
                        <div>
                            <div className='flex'>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1 p-1 xs:gap-y-2 xs:p-3 md:gap-y-3 md:p-7'>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                        <div>asdfasdfasdfasdfsdfasdfasdf</div>
                    </div>
                </div>
            </div>
        </DashboardTemplate>
    )
}

export default Support
