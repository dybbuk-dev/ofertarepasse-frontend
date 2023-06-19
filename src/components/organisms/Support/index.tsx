import React, { useState, useEffect, useRef } from 'react'
import DashboardTemplate from 'components/templates/DashboardTemplate'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import DefaultProfile from 'assets/images/defaultProfile.png'
import { socket } from 'socket'
import api from 'services/api'
import { useAuth } from 'hooks/auth'
import getUrlAws from 'utils/getUrlAws'
import { Roles } from 'types'

export interface IChat {
    id: string
    message: string
    senderId: string
    recipientId: string
    isRead: boolean
    createdAt: string
    updatedAt: string
}

export interface IAllMessages {
    userid: string
    username: string
    lastMsg: string
    lastMsgTime: string
    avatar: string
    isOnline: boolean
    newMsgCount: number
}

export interface ISelectedUser {
    id: string
    image: string
    name: string
    isOnline: boolean
}

const Support = () => {
    const { user, isAuthenticated } = useAuth()
    const isAdmin = user?.roles === Roles.ADMIN
    const userChat = useRef<HTMLDivElement>(null)

    const [selectedUser, setSelectedUser] = useState<ISelectedUser>({
        id: '',
        image: '',
        name: '',
        isOnline: false,
    })
    const [selectedRecipient, setSelectedRecipient] = useState<string>('')
    const [selectedUserChat, setSelectedUserChat] = useState<IChat[]>([])
    const [message, setMessage] = useState<string>('')
    const [allMessages, setAllMessages] = useState<IAllMessages[]>([])

    const loadChatHistory = async () => {
        if (isAuthenticated) {
            const res = await api.get(`/api/v1/chat/${user?.id}`)
            setAllMessages(res.data.items)
            if (!res.data.items?.length) {
                socket.emit('message', {
                    message: '',
                    recipientId: '',
                    meta: 'INIT',
                })
            } else if (!selectedRecipient) {
                setSelectedRecipient(res.data.items?.[0]?.userid)
            }
        }
    }
    const loadCurrentChat = async () => {
        if (isAuthenticated && selectedRecipient) {
            const res = await api.get(`/api/v1/chat/${user?.id}/${selectedRecipient}`)
            console.log('asfdasdfasdf', res.data.items, res.data.user)
            setSelectedUserChat(res.data.items)
            setSelectedUser(res.data.user)
        }
    }

    const markAllRead = async () => {
        if (selectedUserChat.find(({ isRead }) => !isRead)) {
            await api.patch(`api/v1/chat/readAll/${user?.id}/${selectedRecipient}`)
            if (isAdmin) {
                loadChatHistory()
            }
        }
    }

    useEffect(() => {
        if (selectedRecipient) {
            loadCurrentChat()
            markAllRead()
        }
    }, [selectedRecipient])

    useEffect(() => {
        if (userChat.current) {
            userChat.current.scrollTop = userChat.current.scrollHeight
        }
        markAllRead()
    }, [selectedUserChat])

    const handleSocketConnection = async (data: IChat) => {
        const recipientId = selectedRecipient
        if (
            (user?.id === data.senderId && recipientId === data.recipientId) ||
            (user?.id === data.recipientId && recipientId === data.senderId)
        ) {
            setSelectedUserChat((prevState) => {
                return [...prevState, data]
            })
        }
        loadChatHistory()
    }

    const handleOnlineStatus = ({ id, isOnline }: { id: string; isOnline: boolean }) => {
        if (allMessages.length) {
            setAllMessages([
                ...allMessages.map(({ userid, ...res }) =>
                    userid === id ? { userid, ...res, isOnline } : { userid, ...res }
                ),
            ])
        }
        if (selectedUser && selectedUser.id === id) {
            setSelectedUser({
                ...selectedUser,
                isOnline,
            })
        }
    }

    const handleSocketConnectionRef = useRef<(arg: IChat) => void>()
    handleSocketConnectionRef.current = handleSocketConnection
    const handleOnlineStatusRef = useRef<(arg: { id: string; isOnline: boolean }) => void>()
    handleOnlineStatusRef.current = handleOnlineStatus

    useEffect(() => {
        loadChatHistory()
        // Socket
        socket.emit('enroll')
        socket.on('message', (data: IChat) => {
            if (handleSocketConnectionRef.current) {
                handleSocketConnectionRef.current(data)
            }
        })
        socket.on('online-status', (data: { id: string; isOnline: boolean }) => {
            if (handleOnlineStatusRef.current) {
                handleOnlineStatusRef.current(data)
            }
        })
        return () => {
            socket.off('message')
            socket.off('online-status')
            socket.disconnect()
        }
    }, [])

    const sendMessage = () => {
        if (message) {
            socket.emit('message', { message, recipientId: selectedRecipient, meta: 'MESSAGE' })
            setMessage('')
        }
    }

    const handleInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key == 'Enter') {
            sendMessage()
        }
    }

    return (
        <DashboardTemplate>
            <div className='font-base mb-5 text-center xs:text-left md:font-[32px]'>Suporte</div>
            <div
                className={`divide-slate-30 grid h-[calc(100vh-300px)] w-full grid-cols-1 divide-x divide-solid divide-slate-200 rounded-[20px] bg-white md:grid-cols-${
                    isAdmin ? 2 : 1
                } overflow-hidden`}
            >
                {user?.roles === Roles.ADMIN && (
                    <div className='relative grid h-[calc(100vh-200px)] grid-rows-[auto_1fr] bg-white md:grid md:rounded-r-none'>
                        <div className='bg-white p-[12px] pl-1 text-base xs:pl-2 md:p-[20px] md:pl-3 md:text-[20px]'>
                            Todas Mensagens
                        </div>
                        <div className='overflow-y-auto'>
                            <div className='flex w-full flex-col divide-y divide-solid divide-slate-200'>
                                {allMessages
                                    ?.sort(
                                        (a, b) =>
                                            new Date(b.lastMsgTime).getTime() -
                                            new Date(a.lastMsgTime).getTime()
                                    )
                                    ?.map(
                                        ({
                                            userid,
                                            avatar,
                                            username,
                                            lastMsg,
                                            isOnline,
                                            lastMsgTime,
                                            newMsgCount,
                                        }) => (
                                            <div
                                                key={userid}
                                                className={`grid w-full cursor-pointer grid-cols-[auto_calc(100%-150px)_auto] items-center gap-x-2 p-1 hover:bg-slate-100 xs:p-3 md:p-5 ${
                                                    userid === selectedRecipient
                                                        ? 'bg-slate-100'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    setSelectedRecipient(userid)
                                                }}
                                            >
                                                <div className='relative h-[50px] w-[50px] md:h-[55px] md:w-[55px]'>
                                                    <img
                                                        src={
                                                            avatar
                                                                ? getUrlAws(avatar)
                                                                : DefaultProfile
                                                        }
                                                        className='h-[50px] w-[50px] rounded-full md:h-[55px] md:w-[55px]'
                                                    />
                                                    <div
                                                        className={`absolute right-0 bottom-0 h-[10px] w-[10px] rounded-full ${
                                                            isOnline ? 'bg-primary' : 'bg-gray-600'
                                                        }`}
                                                    ></div>
                                                </div>
                                                <div className='flex flex-col py-1 md:py-3'>
                                                    <div className='text-[17px]'>{username}</div>
                                                    <div className='text-[13px] text-[#888888]'>
                                                        <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
                                                            {lastMsg}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='text-[12px]'>
                                                        {`${new Date(
                                                            lastMsgTime
                                                        ).toLocaleDateString()} ${new Date(
                                                            lastMsgTime
                                                        ).toLocaleTimeString()}`}
                                                    </div>
                                                    {!!newMsgCount && (
                                                        <div className='h-[25px] w-[25px] rounded-full bg-primary text-center text-white'>
                                                            {newMsgCount}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                )}
                <div className='relative grid h-[calc(100vh-300px)] grid-rows-[auto_1fr_auto] rounded-[12px] bg-white md:rounded-l-none md:rounded-r-[20px]'>
                    <div className='flex items-center gap-x-2 border-b border-slate-200 p-1 xs:p-3 md:p-7'>
                        <div className='relative h-[50px] w-[50px] md:h-[55px] md:w-[55px]'>
                            <img
                                src={
                                    selectedUser.image
                                        ? getUrlAws(selectedUser.image)
                                        : DefaultProfile
                                }
                                className='h-[50px] w-[50px] rounded-full md:h-[55px] md:w-[55px]'
                            />
                            <div
                                className={`absolute right-0 bottom-0 h-[10px] w-[10px] rounded-full ${
                                    selectedUser.isOnline ? 'bg-primary' : 'bg-gray-600'
                                }`}
                            ></div>
                        </div>
                        <div className='flex max-w-[calc(100%-100px)] grow flex-col py-1 md:py-3'>
                            <div className='text-[17px]'>{selectedUser.name}</div>
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
                    <div
                        className='flex flex-col gap-y-1 overflow-y-auto p-5 xs:gap-y-2 xs:p-6 md:gap-y-3 md:p-7'
                        ref={userChat}
                    >
                        {selectedUserChat?.map((chat) => {
                            // todo: add isRead here <-----------------------------
                            const { senderId, recipientId, message, createdAt: time } = chat
                            return (
                                <div
                                    key={time}
                                    className={`flex ${
                                        senderId === user?.id ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`relative flex max-w-[80%] flex-col rounded-lg p-4 ${
                                            senderId === user?.id ? 'bg-primary' : 'bg-gray-600'
                                        } items-end text-white`}
                                    >
                                        <div className='text-sm'>{message}</div>
                                        <div className='text-xs'>
                                            {new Date(time).toLocaleTimeString()}{' '}
                                            {/* {senderId === user?.id &&
                                                (isRead ? (
                                                    <DoneAllIcon sx={{ fontSize: '12px' }} />
                                                ) : (
                                                    <CheckIcon sx={{ fontSize: '12px' }} />
                                                ))} */}
                                        </div>
                                        <div
                                            className={`absolute top-0 border-transparent ${
                                                senderId === user?.id ? '-right-4' : '-left-4'
                                            } border-[16px] ${
                                                senderId === user?.id
                                                    ? 'border-t-primary'
                                                    : 'border-t-gray-600'
                                            }`}
                                        ></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='grid grid-cols-[1fr_auto] items-center gap-x-3 px-2 py-1'>
                        <input
                            type='text'
                            size={1}
                            className='grow rounded-xl border border-slate-300 px-3 py-2 outline-none'
                            onKeyDown={handleInput}
                            value={message}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                setMessage(ev.target.value)
                            }}
                        />
                        <button
                            className='translate-all rounded-lg border border-slate-300 px-3 py-1 duration-100 hover:bg-slate-200'
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </DashboardTemplate>
    )
}

export default Support
