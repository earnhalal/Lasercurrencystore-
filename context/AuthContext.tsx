import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User, Order } from '../types';

interface AuthContextType {
    user: User | null;
    orders: Order[];
    signup: (name: string, email: string, password: string) => Promise<void>;
    submitPaymentProof: (email: string) => Promise<void>;
    logout: () => void;
    addOrder: (order: Order) => void;
    resetSignup: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Mock User Database in localStorage ---
const getUsers = (): Record<string, User> => JSON.parse(localStorage.getItem('users') || '{}');
const getOrders = (): Record<string, Order[]> => JSON.parse(localStorage.getItem('orders') || '{}');

const saveUser = (user: User) => {
    const users = getUsers();
    users[user.email] = { ...users[user.email], ...user };
    localStorage.setItem('users', JSON.stringify(users));
};

const saveOrders = (email: string, orders: Order[]) => {
    const allOrders = getOrders();
    allOrders[email] = orders;
    localStorage.setItem('orders', JSON.stringify(allOrders));
};
// --- End Mock Database ---


// --- Device ID Management ---
const getDeviceID = (): string => {
    let deviceId = localStorage.getItem('appDeviceId');
    if (!deviceId) {
        deviceId = self.crypto.randomUUID();
        localStorage.setItem('appDeviceId', deviceId);
    }
    return deviceId;
};

const getSignedUpDevices = (): Record<string, string> => JSON.parse(localStorage.getItem('signedUpDevices') || '{}');

const saveSignedUpDevice = (deviceId: string, email: string) => {
    const devices = getSignedUpDevices();
    devices[deviceId] = email;
    localStorage.setItem('signedUpDevices', JSON.stringify(devices));
};
// --- End Device ID Management ---

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const loggedInUserEmail = localStorage.getItem('loggedInUser');
        if (loggedInUserEmail) {
            const users = getUsers();
            return users[loggedInUserEmail] || null;
        }
        return null;
    });
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (user) {
            setOrders(getOrders()[user.email] || []);
        } else {
            setOrders([]);
        }
    }, [user]);

    // Simulate admin verification for accounts that submitted payment proof
    useEffect(() => {
        const interval = setInterval(() => {
            if (user && user.status === 'pendingAdminVerification') {
                 const updatedUser = { ...user, status: 'verified' as const, balance: 20 };
                 setUser(updatedUser);
                 saveUser(updatedUser);
                 // In a real app, this logic would be on a backend and triggered by an admin.
            }
        }, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    }, [user]);
    
    const signup = async (name: string, email: string, password: string): Promise<void> => {
        const users = getUsers();
        if (users[email]) {
            // Allow re-trying if signup was incomplete
            if (users[email].status !== 'verified') {
                 console.log("Allowing user to re-attempt signup process.");
            } else {
                throw new Error("An account with this email already exists.");
            }
        }
        
        // One device, one account rule
        const deviceId = getDeviceID();
        const signedUpDevices = getSignedUpDevices();
        if (Object.keys(signedUpDevices).includes(deviceId) && signedUpDevices[deviceId] !== email) {
            throw new Error("This device is already associated with another account.");
        }


        // Directly set status to pendingPayment, no OTP
        const newUser: User = { name, email, password, status: 'pendingPayment', balance: 0 };
        saveUser(newUser);

        saveSignedUpDevice(deviceId, newUser.email);
        
        // Set user in state to trigger UI update and "log in" the user
        setUser(newUser);
        localStorage.setItem('loggedInUser', email);
    };

    const submitPaymentProof = async (email: string): Promise<void> => {
        const userToUpdate = getUsers()[email];
        if(userToUpdate) {
            const updatedUser = { ...userToUpdate, status: 'pendingAdminVerification' as const };
            saveUser(updatedUser);
            setUser(updatedUser); // Update context
        }
    };
    
    const resetSignup = (email: string) => {
        if(!email) return;
        const users = getUsers();
        // Only remove user if they haven't been verified
        if (users[email] && users[email].status !== 'verified') {
            delete users[email];
            localStorage.setItem('users', JSON.stringify(users));
        }
        if(user && user.email === email) {
            logout();
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
    };

    const addOrder = (order: Order) => {
        if (user) {
            const newOrders = [...orders, order];
            setOrders(newOrders);
            saveOrders(user.email, newOrders);
        }
    };

    return (
        <AuthContext.Provider value={{ user, orders, signup, submitPaymentProof, logout, addOrder, resetSignup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};