import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const UserProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <header className="bg-black/50 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg shadow-purple-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-amber-400">
                                Laser Currency Store
                            </h1>
                            <p className="text-xs text-gray-400">Premium Laser Currency Copies for Collectors</p>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-amber-400 transition duration-150 ease-in-out">Home</Link>
                        <Link to="/cart" className="relative text-gray-300 hover:text-amber-400 transition duration-150 ease-in-out">
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-300 hover:text-amber-400 transition duration-150 ease-in-out">Dashboard</Link>
                                <button onClick={logout} className="bg-gray-800 hover:bg-gray-700 hover:shadow-lg hover:shadow-purple-500/50 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/auth" className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/40 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                                Signup
                            </Link>
                        )}
                    </nav>
                     <div className="md:hidden flex items-center space-x-4">
                         <Link to="/cart" className="relative text-gray-300 hover:text-amber-400 transition duration-150 ease-in-out">
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <Link to="/dashboard" className="text-gray-300 hover:text-amber-400 transition duration-150 ease-in-out">
                                <UserProfileIcon />
                            </Link>
                        ) : (
                             <Link to="/auth" className="bg-gradient-to-r from-amber-500 to-purple-600 hover:opacity-90 text-white font-bold py-2 px-3 text-sm rounded-lg transition duration-150 ease-in-out">
                                Signup
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};