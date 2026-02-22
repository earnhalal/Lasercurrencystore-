import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

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
    const location = useLocation();
    const [isCelebration, setIsCelebration] = useState(false);
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    if (location.pathname === '/dashboard') return null;

    return (
        <header className="bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-[100] py-4">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-4 group">
                        <StoreLogo />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-white tracking-tighter leading-none group-hover:text-amber-400 transition-colors uppercase">
                                LASER<span className="text-amber-500">STORE</span>
                            </h1>
                            <span className="text-[8px] font-black text-slate-500 tracking-[0.4em] uppercase">Authorized Repository</span>
                        </div>
                    </Link>
                    
                    <div className="hidden lg:flex items-center gap-10">
                        {/* Interactive Toggle */}
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/5 group">
                            <span className={`text-[9px] font-black uppercase tracking-widest ${!isCelebration ? 'text-amber-500' : 'text-slate-500'}`}>Standard</span>
                            <button 
                                onClick={() => setIsCelebration(!isCelebration)}
                                className="w-12 h-6 bg-slate-800 rounded-full p-1 relative transition-all duration-300"
                            >
                                <div className={`w-4 h-4 rounded-full transition-all duration-500 transform shadow-[0_0_10px_rgba(212,175,55,0.5)] ${isCelebration ? 'translate-x-6 bg-amber-500' : 'translate-x-0 bg-blue-500'}`}></div>
                            </button>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${isCelebration ? 'text-amber-500' : 'text-slate-500'}`}>Celebration</span>
                        </div>

                        <nav className="flex items-center space-x-8">
                            <Link to="/" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition">Shop</Link>
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition">Dashboard</Link>
                                    <button onClick={logout} className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest transition">Logout</button>
                                </>
                            ) : (
                                <Link to="/auth" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 transition">Login</Link>
                            )}
                        </nav>

                        <Link to="/cart" className="relative group p-3 bg-white/5 rounded-xl hover:bg-white/10 border border-white/5 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 bg-white/5 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{cartItemCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};