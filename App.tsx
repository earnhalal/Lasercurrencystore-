import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { PrivacyPage } from './pages/PrivacyPage';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <HashRouter>
                    <div 
                        className="min-h-screen flex flex-col bg-gray-900 text-white"
                        style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-purple-900/20 z-0"></div>
                         <div className="relative z-10 flex flex-col flex-grow">
                            <Header />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/product/:id" element={<ProductDetailPage />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/auth" element={<AuthPage />} />
                                    <Route path="/dashboard" element={<DashboardPage />} />
                                    <Route path="/privacy" element={<PrivacyPage />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </div>
                </HashRouter>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
