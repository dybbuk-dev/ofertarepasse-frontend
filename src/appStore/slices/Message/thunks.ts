import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'

export const readMessages = createAsyncThunk(
    'message/readMessage',
    async (data: { numberOfMessages: number }) => data
)

export const getNewMessageCount = createAsyncThunk(
    'message/getNewmessageCount',
    async (data: { userId: string }, { rejectWithValue }) => {
        try {
            const res = await api.get('/api/v1/chat/getNewMessageCount', {
                params: {
                    ...data,
                },
            })
            return res.data
        } catch (err: any) {
            console.log('get new message count api request error', err)
            rejectWithValue(err.message)
        }
    }
)
