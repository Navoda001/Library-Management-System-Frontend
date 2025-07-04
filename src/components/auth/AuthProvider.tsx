import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface JwtPayload {
  sub: string;
  roles: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setisAuthenticated] = useState(false)

    useEffect(() => {
        //get the token from local strage and validate
        const token = localStorage.getItem("libToken")

        if (token) {
            setisAuthenticated(!!token)
        }
    }, [])

    const login = (token: string) => {
        //set token from localstorage
        localStorage.setItem("libToken", token)
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        setisAuthenticated(true)
    }
    const logout = () => {
        //remove token from localstorage 
        localStorage.removeItem("libToken")
        setisAuthenticated(false)
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth should be used within an AuthProvider")
    }
    return context;
}
