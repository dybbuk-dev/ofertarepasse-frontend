import {
    configureStore,
    ThunkAction,
    Action,
    Reducer,
    combineReducers,
    AnyAction,
} from '@reduxjs/toolkit'
import {
    persistReducer,
    persistStore,
    PAUSE,
    REHYDRATE,
    FLUSH,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { MessageReducer } from './slices'

const persistConfig = {
    key: 'root',
    version: 6,
    storage,
}

const appReducer = combineReducers({
    message: MessageReducer,
})

// implement the signout action here to clear out state and return an empty object to redux persist
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    return appReducer(state, action)
}

const persistedReducer: typeof appReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // disable serializable check for redux persist actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// create a persistor
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
