import { useState } from "react"
import { createContext } from "react"
const authContext = createContext


const authProvider = ({children}){
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    return (
        <authContext.Provider value={loading, setLoading, user, setUser}>
            {children}
        </authContext.Provider>
    )
}
