// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

// 1. Context maken
const AuthContext = createContext();

// 2. Provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        setUser(atob(base64));
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            parseJwt(token);
            console.log("opnieuw user toegeveogd aan de state");
        }
    }, []);

    async function login(email, password) {
        const response = await fetch('http://top2000backend.runasp.net/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).catch(err => {return 'Inloggen mislukt'});
        if (typeof response == 'string') {
            return response;
        }
        const data = await response.json();
        if (response.status == 200) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            parseJwt(data.token);
            navigate("/");
        } else {
            console.log("Inloggen Mislukt");
            console.log("Van AuthContext:");
            console.log(data);
            if (data.errors) {
                return [data.errors.Email, data.errors.Password];
            } else {
                return [[data.message], [data.message]];
            }
        }
    }

    // Functie om uit te loggen
    function logout() {
        const token = localStorage.getItem("accessToken");
        if (token) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setUser(null);
            console.log("Uitgelogd");
        }
    }

    async function register(email, password, confirmPassword) {
        const response = await fetch('http://top2000backend.runasp.net/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
                ConfirmPassword: confirmPassword

            })
        }).catch(err => {return 'Registreren mislukt'});
        if (typeof response == 'string') {
            return response;
        }
        const data = await response.json();
        if (response.status == 200) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            parseJwt(data.token);
            navigate("/");
        } else {
            console.log("Registreren Mislukt");
            console.log(data);
            if (data.errors) {
                return [data.errors.Email, data.errors.Password, data.errors.ConfirmPassword];
            } else {
                if (data["DuplicateEmail"]) return [data["DuplicateEmail"], [], []];
                if (data["PasswordRequiresUpper"]) return [[], data["PasswordRequiresUpper"], []];
                if (data["PasswordRequiresDigit"]) return [[], data["PasswordRequiresDigit"], []];
                if (data["PasswordRequiresLower"]) return [[], data["PasswordRequiresLower"], []];
                if (data["InvalidUserName"]) return [data["InvalidUserName"], [], []];
            }
        }
    }

    async function apiRequest(url, options = {}) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        };

        let response = await fetch(url, options);

        if (response.status === 401) {
            // Access token verlopen - refresh
            const refreshResponse = await fetch('http://top2000backend.runasp.net/api/auth/refresh-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    refreshToken: localStorage.getItem('refreshToken')
                })
            });

            if (refreshResponse.ok) {
                const newTokens = await refreshResponse.json();
                localStorage.setItem('accessToken', newTokens.token);
                localStorage.setItem('refreshToken', newTokens.refreshToken);

                // Retry met nieuwe token
                options.headers['Authorization'] = `Bearer ${newTokens.token}`;
                response = await fetch(url, options);
            } else {
                // Refresh failed - redirect to login
                window.location.href = '/login';
            }
        }
        return response;
    }

    // Functie om te checken of ingelogd
    function isLoggedIn() {
        return user !== null;
    }

    function IsAdmin() {
        if (!user) return false
        const JsonUser = JSON.parse(user);
        const role = JsonUser["https://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        return role.includes("Admin");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn, IsAdmin, apiRequest }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}