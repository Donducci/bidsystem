import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import collectionReducer from './collectionSlice'
import bidReducer from './bidSlice'

export const store = configureStore({
  reducer: { collection: collectionReducer, bid: bidReducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;