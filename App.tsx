import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
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
import { ScrollToTop } from './components/ScrollToTop';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <HomePage />
                    </motion.div>
                } />
                <Route path="/product/:id" element={
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                        <ProductDetailPage />
                    </motion.div>
                } />
                <Route path="/cart" element={
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                        <CartPage />
                    </motion.div>
                } />
                <Route path="/auth" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <AuthPage />
                    </motion.div>
                } />
                <Route path="/dashboard" element={
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                        <DashboardPage />
                    </motion.div>
                } />
                <Route path="/privacy" element={
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                        <PrivacyPage />
                    </motion.div>
                } />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <HashRouter>
                    <ScrollToTop />
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
                                <AnimatedRoutes />
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
