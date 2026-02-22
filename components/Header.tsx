import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Sun, Moon, ShoppingCart, User } from 'lucide-react';

const StoreLogo = () => (
// ... existing StoreLogo ...
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
    <rect width="42" height="42" rx="10" fill="url(#logo_grad)"/>
    <path d="M10 30V12H15V25H24V30H10Z" fill="white"/>
    <path d="M28 28C24.6863 28 22 25.3137 22 22C22 18.6863 24.6863 16 28 16C31.3137 16 34 18.6863 34 22C34 25.3137 31.3137 28 28 28ZM28 25C29.6569 25 31 23.6569 31 22C31 20.3431 29.6569 19 28 19C26.3431 19 25 20.3431 25 22C25 23.6569 26.3431 25 28 25Z" fill="#D4AF37"/>
    <defs>
      <linearGradient id="logo_grad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E3A8A"/>
        <stop offset="1" stopColor="#0F172A"/>
      </linearGradient>
    </defs>
  </svg>
);

export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    if (location.pathname === '/dashboard') return null;

    return (
        <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 sticky top-0 z-[100] py-4 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between gap-4 lg:gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <StoreLogo />
                        <div className="flex flex-col hidden sm:flex">
                            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none group-hover:text-amber-500 transition-colors uppercase">
                                LASER<span className="text-amber-500">STORE</span>
                            </h1>
                            <span className="text-[8px] font-black text-slate-500 tracking-[0.4em] uppercase">Premium Replicas</span>
                        </div>
                    </Link>
                    
                    {/* Search Bar (Amazon Style) */}
                    <div className="flex-grow max-w-2xl hidden md:flex">
                        <div className="relative w-full flex items-center">
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search bundles, series, or categories..." 
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-l-xl py-3 px-5 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                            />
                            <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-r-xl transition-colors flex items-center justify-center border border-amber-500">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8 shrink-0">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors border border-slate-200 dark:border-white/5"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        <nav className="hidden lg:flex items-center space-x-6">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link to="/dashboard" className="flex items-center gap-2 text-[10px] font-black text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition">
                                        <User className="w-4 h-4" /> Dashboard
                                    </Link>
                                    <button onClick={logout} className="text-[10px] font-black text-red-500 hover:text-red-600 dark:hover:text-red-400 uppercase tracking-widest transition">Logout</button>
                                </div>
                            ) : (
                                <Link to="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 transition">Login</Link>
                            )}
                        </nav>

                        {/* Cart */}
                        <Link to="/cart" className="relative group p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 transition flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-slate-700 dark:text-slate-300 group-hover:text-amber-500" />
                            <span className="hidden sm:inline text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Cart</span>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-sm">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
                
                {/* Mobile Search Bar */}
                <div className="mt-4 md:hidden flex">
                    <div className="relative w-full flex items-center">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search bundles..." 
                            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-l-xl py-3 px-4 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        />
                        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-3 rounded-r-xl transition-colors flex items-center justify-center border border-amber-500">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};