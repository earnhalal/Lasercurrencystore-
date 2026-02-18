import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const StoreLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#1E3A8A"/>
    <path d="M10 28V12H14V24H22V28H10Z" fill="white"/>
    <path d="M26 28C22.6863 28 20 25.3137 20 22C20 18.6863 22.6863 16 26 16C29.3137 16 32 18.6863 32 22C32 25.3137 29.3137 28 26 28ZM26 24C27.1046 24 28 23.1046 28 22C28 20.8954 27.1046 20 26 20C24.8954 20 24 20.8954 24 22C24 23.1046 24.8954 24 26 24Z" fill="#D4AF37"/>
  </svg>
);

export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-3">
                        <StoreLogo />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-blue-900 leading-none">LASER STORE</span>
                            <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase">Wedding Special</span>
                        </div>
                    </Link>
                    
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-sm font-bold text-slate-600 hover:text-blue-900 transition">Shop</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-sm font-bold text-slate-600 hover:text-blue-900 transition">My Orders</Link>
                                <button onClick={logout} className="text-sm font-bold text-red-500 hover:text-red-700">Logout</button>
                            </>
                        ) : (
                            <Link to="/auth" className="text-sm font-bold text-blue-900">Login / Signup</Link>
                        )}
                        <Link to="/cart" className="relative group p-2 bg-slate-50 rounded-full hover:bg-blue-50 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600 group-hover:text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </nav>

                    <div className="md:hidden flex items-center gap-4">
                        <Link to="/cart" className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">{cartItemCount}</span>}
                        </Link>
                        {user ? <Link to="/dashboard" className="text-blue-900 font-bold text-sm">Account</Link> : <Link to="/auth" className="text-blue-900 font-bold text-sm">Login</Link>}
                    </div>
                </div>
            </div>
        </header>
    );
};