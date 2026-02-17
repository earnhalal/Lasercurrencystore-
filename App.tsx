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
                        className="min-h-screen flex flex-col bg-white text-slate-900"
                        style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                         {/* High-end decorative background */}
                         <div className="fixed inset-0 pointer-events-none z-0">
                            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-50/50 rounded-full blur-[120px] -mr-40 -mt-40 opacity-60"></div>
                            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-amber-50/50 rounded-full blur-[120px] -ml-40 -mb-40 opacity-40"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-[0.03]"></div>
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