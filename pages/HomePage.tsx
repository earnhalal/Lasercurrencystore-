import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Package } from 'lucide-react';

export const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            {/* Simple Hero Section */}
            <section className="py-32 px-4 text-center">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight uppercase">
                            Premium <span className="text-amber-500">Wedding</span> <br/> Replicas Store
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
                            Pakistan's most trusted source for high-quality cinematic replicas. 
                            Professional grade bundles for your special events.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/auth" className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-4 rounded-xl transition shadow-xl shadow-blue-900/20 uppercase tracking-widest text-[10px]">
                                Start Shopping
                            </Link>
                            <Link to="/auth" className="bg-white/5 hover:bg-white/10 text-white font-black px-10 py-4 rounded-xl transition backdrop-blur-md border border-white/10 uppercase tracking-widest text-[10px]">
                                Member Login
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all">
                            <ShieldCheck className="w-10 h-10 text-amber-500 mb-6" />
                            <h3 className="text-lg font-black text-white uppercase mb-4">Secure Delivery</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">Safe and discreet shipping across Pakistan with leading courier partners.</p>
                        </div>
                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all">
                            <Zap className="w-10 h-10 text-amber-500 mb-6" />
                            <h3 className="text-lg font-black text-white uppercase mb-4">Fast Verification</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">Quick payment verification and balance updates for seamless shopping.</p>
                        </div>
                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all">
                            <Package className="w-10 h-10 text-amber-500 mb-6" />
                            <h3 className="text-lg font-black text-white uppercase mb-4">Premium Quality</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">Top-tier micro-printing simulation for the most realistic cinematic experience.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
