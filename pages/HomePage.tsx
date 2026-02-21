import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Package } from 'lucide-react';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const isAvailable = product.status === 'available';
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`group bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-amber-500/30 hover:-translate-y-2 flex flex-col ${!isAvailable ? 'opacity-40 grayscale' : ''}`}
        >
            <div className={`h-1 w-full bg-gradient-to-r ${isAvailable ? 'from-blue-600 to-amber-500' : 'from-slate-700 to-slate-800'}`}></div>
            
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-black text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">Lot ID: {product.id.toString().padStart(4, '0')}</span>
                    {product.status !== 'available' && (
                        <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Inventory Lock</span>
                    )}
                </div>
                
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors uppercase tracking-tight">{product.name}</h3>
                <p className="text-xs text-slate-400 mb-8 leading-relaxed font-medium line-clamp-3 h-12">{product.description}</p>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                        <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest block mb-1">Bundle Valuation</span>
                        <span className="text-xl font-black text-white tracking-tighter">
                            {isAvailable ? `${product.price.toLocaleString()}` : '---'}<span className="text-[10px] text-amber-500 ml-1 font-black">PKR</span>
                        </span>
                    </div>
                    {isAvailable ? (
                        <Link to={`/product/${product.id}`} className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-xl transition shadow-lg shadow-amber-500/10 active:scale-90">
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    ) : (
                        <div className="p-2.5 bg-slate-800 rounded-xl text-slate-600">
                             <ShieldCheck className="h-5 w-5" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-24 px-4 relative overflow-hidden text-center border-b border-white/5 bg-slate-950/40">
                {/* Top Center Animation */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                    <motion.div 
                        animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
                        <div className="relative bg-slate-900 border border-amber-500/30 p-3 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Sparkles className="w-6 h-6 text-amber-500" />
                        </div>
                    </motion.div>
                </div>

                <div className="container mx-auto relative z-10 max-w-5xl">
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-8"
                    >
                        <Sparkles className="w-3 h-3" />
                        Elite Celebration Vault
                    </motion.span>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
                    >
                        CELEBRATE IN <br/> 
                        <motion.span 
                            animate={{ 
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{ 
                                duration: 5, 
                                repeat: Infinity, 
                                ease: "linear" 
                            }}
                            style={{ backgroundSize: "200% auto" }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 inline-block"
                        >
                            ROYAL STYLE
                        </motion.span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-base text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        Authorized regional repository for professional-grade wedding replicas. 
                        Indistinguishable quality for cinematic entries and grand celebration showering.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <a href="#inventory" className="bg-white text-slate-950 font-black px-10 py-4 rounded-xl transition shadow-2xl hover:bg-amber-400 uppercase tracking-widest text-[10px] flex items-center gap-2">
                            Access Inventory <ArrowRight className="w-3 h-3" />
                        </a>
                        <Link to="/auth" className="bg-white/5 hover:bg-white/10 text-white font-black px-10 py-4 rounded-xl transition backdrop-blur-md border border-white/10 uppercase tracking-widest text-[10px]">
                            Member Registration
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Inventory */}
            <section id="inventory" className="container mx-auto px-4 py-24 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Master Manifest</h2>
                        <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Select your series for the upcoming event</p>
                    </div>
                    <div className="w-full md:w-80 relative">
                        <input 
                            type="text" 
                            placeholder="Series ID or Name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl px-12 py-4 text-[11px] font-bold text-white focus:ring-2 focus:ring-amber-500 transition outline-none"
                        />
                        <Zap className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>

            {/* Guidelines (Fill Content) */}
            <section className="bg-slate-950/60 py-24 border-y border-white/5">
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <h4 className="text-amber-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            <Package className="w-4 h-4" /> 01. Logistic Standards
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">All bundles are shipped in neutral, security-shielded packaging to ensure maximum discretion during transit and arrival.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-amber-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            <Zap className="w-4 h-4" /> 02. Event Compatibility
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">Engineered with low-friction coatings to ensure notes separate perfectly when used with electric money guns or manual showering.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-amber-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> 03. Verification Audit
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">Every dispatch undergoes a triple-count audit to guarantee exactly 100 notes per bundle before sealing for shipment.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
