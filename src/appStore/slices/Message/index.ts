import { createSlice } from '@reduxjs/toolkit'
import { getNewMessageCount, readMessages } from './thunks'

export interface IMessage {
    newMessageCount: number
}

const initialState: IMessage = {
    newMessageCount: 0,
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNewMessageCount.fulfilled, (state, action) => {
                return {
                    ...state,
                    ...action.payload,
                }
            })
            .addCase(readMessages.fulfilled, (state, action) => {
                return {
                    ...state,
                    newMessageCount: state.newMessageCount - action.payload.numberOfMessages,
                }
            })
    },
})

export default messageSlice.reducer
