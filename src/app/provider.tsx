'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/redux/store'
import Loading from '@/components/Loading'

export default function Providers({ children }: { children: ReactNode }) {
  persistor.persist()
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {children}
          <Toaster richColors position='bottom-right' />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
