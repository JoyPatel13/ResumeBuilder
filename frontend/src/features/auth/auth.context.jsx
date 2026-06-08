import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api"; // your existing endpoint

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
            const response = await getMe(controller.signal);
            clearTimeout(timeout);
            setUser(response.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false); // ← this is the critical part
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
};