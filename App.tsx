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
                        className="min-h-screen flex flex-col bg-[#020617] text-slate-300 selection:bg-amber-500/30 selection:text-amber-200"
                        style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                         {/* Atmospheric Background Lighting */}
                         <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                            <div className="absolute top-[-20%] right-[-10%] w-[60rem] h-[60rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
                            <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-amber-500/5 rounded-full blur-[100px]"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
                         </div>
                         
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