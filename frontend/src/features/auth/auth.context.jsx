import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api"; // your existing endpoint

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe(); // calls GET /auth/me or similar
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