import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const UserProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-100 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex-shrink-0">
                        <Link to="/" className="group flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-900 flex items-center justify-center rounded-2xl shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
                                <span className="text-white font-black text-xl tracking-tighter">LC</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-blue-900 transition-colors uppercase">
                                    LASER <span className="text-amber-500">CURRENCY</span>
                                </h1>
                                <p className="text-[9px] text-slate-400 font-black tracking-[0.4em] uppercase">Premium Repository</p>
                            </div>
                        </Link>
                    </div>
                    
                    <nav className="hidden md:flex items-center space-x-12">
                        <Link to="/" className="text-[11px] font-black text-slate-500 hover:text-blue-900 transition uppercase tracking-[0.2em]">Archive</Link>
                        <Link to="/cart" className="relative text-slate-500 hover:text-blue-900 transition group">
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-3 -right-3 bg-amber-500 text-white text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-white">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <div className="flex items-center gap-8 pl-8 border-l border-slate-100">
                                <Link to="/dashboard" className="text-[11px] font-black text-slate-500 hover:text-blue-900 transition uppercase tracking-[0.2em]">Dashboard</Link>
                                <button onClick={logout} className="text-[11px] font-black text-red-500 hover:text-red-700 uppercase tracking-[0.2em] transition">
                                    Terminate
                                </button>
                            </div>
                        ) : (
                            <Link to="/auth" className="bg-blue-900 hover:bg-blue-800 text-white font-black py-3.5 px-8 rounded-xl shadow-2xl shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 uppercase text-[10px] tracking-[0.25em]">
                                Client Login
                            </Link>
                        )}
                    </nav>

                     <div className="md:hidden flex items-center gap-6">
                         <Link to="/cart" className="relative text-slate-500">
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <Link to="/dashboard" className="text-slate-500">
                                <UserProfileIcon />
                            </Link>
                        ) : (
                             <Link to="/auth" className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-b-2 border-blue-900">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};