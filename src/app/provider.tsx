'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/redux/store'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
          <Toaster richColors position='bottom-right' />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
