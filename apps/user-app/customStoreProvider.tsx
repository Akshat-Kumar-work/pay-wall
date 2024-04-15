"use client"

//custom client side provider for redux store and next auth session provider to wrap the children of server side component"

import { ReactNode } from 'react';
import { Provider } from "react-redux"
import { SessionProvider } from 'next-auth/react';
import Store from "@repo/store/store"

const customStoreProvider = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider>
        <Provider store={Store}>
            {children}
        </Provider>
    </SessionProvider>

  )
}

export default customStoreProvider