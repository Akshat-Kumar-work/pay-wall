"use client"

//custom client side provider for redux store to wrap the children of server side component"

import { ReactNode } from 'react';
import { Provider } from "react-redux"
import Store from "@repo/store/store"

const customStoreProvider = ({children}:{children:ReactNode}) => {
  return (
        <Provider store={Store}>
            {children}
        </Provider>
  )
}

export default customStoreProvider