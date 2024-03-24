import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import cartReducer from './cartSlice'
import {
  persistStore,
  persistReducer,
  WebStorage,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

const rootReducer = combineReducers({ cartState: 'hello' })

// create a dummy server for the local storage

export function createPersistStore(): WebStorage {
  const isServer = typeof window === 'undefined'
  //   return dummy server
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null)
      },
      setItem() {
        return Promise.resolve()
      },
      removeItem() {
        return Promise.resolve()
      },
    }
  }
  return createWebStorage('local')
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createPersistStore()

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
