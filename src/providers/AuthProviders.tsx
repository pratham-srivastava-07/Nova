import { createContext, useEffect, useState, useContext, ReactNode, } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {}
})

export function AuthProvider({children}: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            setIsAuthenticated(true)
        }
    }, [])

    return <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}