import { Provider } from "react-redux"

import { store } from "../config/store" 
import { ReactNode } from "react"
export interface IStoreProvider{
    children?: ReactNode
}
export const StoreProvider = ({children}:IStoreProvider) => {
    return (
        <Provider store={store}>{children}</Provider>   
    )
}