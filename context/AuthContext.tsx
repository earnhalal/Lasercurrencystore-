import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';
import { 
    doc, 
    setDoc, 
    updateDoc, 
    collection, 
    query, 
    where, 
    onSnapshot,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import type { User, Order } from '../types';

interface AuthContextType {
    user: User | null;
    orders: Order[];
    signup: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    submitPaymentProof: (email: string, transactionId: string) => Promise<void>;
    submitDeposit: (amount: number, transactionId: string) => Promise<void>;
    deductBalance: (amount: number) => Promise<void>;
    logout: () => void;
    addOrder: (order: Order) => void;
    resetSignup: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribeUser: (() => void) | undefined;

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser && firebaseUser.email) {
                // Use onSnapshot for real-time user profile updates
                unsubscribeUser = onSnapshot(
                    doc(db, 'users', firebaseUser.email),
                    (docSnap) => {
                        if (docSnap.exists()) {
                            setUser(docSnap.data() as User);
                        } else {
                            // Document might not exist yet during signup
                            console.log("User document pending creation...");
                        }
                        setLoading(false);
                    },
                    (error) => {
                        console.error("Firestore permission error:", error);
                        setLoading(false);
                    }
                );
            } else {
                setUser(null);
                setLoading(false);
                if (unsubscribeUser) unsubscribeUser();
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeUser) unsubscribeUser();
        };
    }, []);

    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'orders'), where('userEmail', '==', user.email));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const ordersData: Order[] = [];
                querySnapshot.forEach((doc) => {
                    ordersData.push({ id: doc.id, ...doc.data() } as unknown as Order);
                });
                setOrders(ordersData);
            }, (error) => {
                console.error("Orders sync error:", error);
            });
            return () => unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (user && user.status === 'pendingAdminVerification') {
            const timeout = setTimeout(async () => {
                const userRef = doc(db, 'users', user.email);
                await updateDoc(userRef, {
                    status: 'verified',
                    balance: 20
                });
                setUser(prev => prev ? { ...prev, status: 'verified', balance: 20 } : null);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [user]);
    
    const signup = async (name: string, email: string, password: string): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const newUser: User = { 
                name, 
                email, 
                password, 
                status: 'pendingPayment', 
                balance: 0 
            };

            await setDoc(doc(db, 'users', email), newUser);
            setUser(newUser);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Signup failed.";
            throw new Error(message);
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Login failed.";
            throw new Error(message);
        }
    };

    const submitPaymentProof = async (email: string, transactionId: string): Promise<void> => {
        try {
            const userRef = doc(db, 'users', email);
            await updateDoc(userRef, {
                status: 'pendingAdminVerification',
                transactionId: transactionId
            });
            setUser(prev => prev ? { ...prev, status: 'pendingAdminVerification' } : null);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to submit proof.";
            throw new Error(message);
        }
    };

    const submitDeposit = async (amount: number, transactionId: string): Promise<void> => {
        if (!user) return;
        try {
            await addDoc(collection(db, 'deposits'), {
                userEmail: user.email,
                amount,
                transactionId,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            
            // For demo purposes, let's auto-approve after 5 seconds
            setTimeout(async () => {
                const userRef = doc(db, 'users', user.email);
                await updateDoc(userRef, {
                    balance: (user.balance || 0) + amount
                });
            }, 5000);

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to submit deposit.";
            throw new Error(message);
        }
    };

    const deductBalance = async (amount: number): Promise<void> => {
        if (!user) return;
        try {
            const userRef = doc(db, 'users', user.email);
            await updateDoc(userRef, {
                balance: user.balance - amount
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to deduct balance.";
            throw new Error(message);
        }
    };
    
    const resetSignup = async () => {
        logout();
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setOrders([]);
    };

    const addOrder = async (order: Order) => {
        if (user) {
            try {
                await addDoc(collection(db, 'orders'), {
                    ...order,
                    userEmail: user.email,
                    createdAt: serverTimestamp()
                });
            } catch (error) {
                console.error("Error adding order: ", error);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            orders, 
            signup, 
            login, 
            submitPaymentProof, 
            submitDeposit,
            deductBalance,
            logout, 
            addOrder, 
            resetSignup 
        }}>
            {!loading && children}
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
