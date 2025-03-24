import { createContext, useContext, useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(import.meta.env.VITE_WS_URL, { share: true })

    useEffect(() => {
        if (lastJsonMessage) {
            if (lastJsonMessage.type === "auth_success") {
                localStorage.setItem("token", lastJsonMessage.token);
                setUser(lastJsonMessage.user);
            }
            if (lastJsonMessage.type === "register_success") {
                localStorage.setItem("token", lastJsonMessage.token);
                setUser(lastJsonMessage.user);
            }
            if (lastJsonMessage.type === "error") {
                console.error(lastJsonMessage.message);
            }
        }
    }, [lastJsonMessage]);


    const login = (email, password) => sendJsonMessage({ type: "login", email, password });
    const register = (name, email, password) => sendJsonMessage({ type: "register", name, email, password });
    const authenticate = () => {
        const token = localStorage.getItem("token");
        if (token) sendJsonMessage({ type: "authenticate", token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => authenticate(), []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
};


export const useAuth = () => useContext(AuthContext);