import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const isAvailable = product.status === 'available';
    
    return (
        <div className={`group bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${!isAvailable ? 'opacity-70' : ''}`}>
            <div className="p-1 bg-blue-900/5 h-2"></div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded uppercase">Bundle LC-{product.id}</span>
                    {product.status === 'stock-end' && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded uppercase">Sold Out</span>}
                    {product.status === 'coming-soon' && <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded uppercase">Coming Soon</span>}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{product.name}</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2 h-10">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div>
                        <span className="text-xs text-slate-400 font-bold uppercase block">Per Copy</span>
                        <span className="text-xl font-bold text-blue-900">{isAvailable ? `${product.price} PKR` : '---'}</span>
                    </div>
                    {isAvailable ? (
                        <Link to={`/product/${product.id}`} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition shadow-lg shadow-amber-500/20">
                            View Bundle
                        </Link>
                    ) : (
                        <span className="text-xs font-bold text-slate-300 uppercase">Unavailable</span>
                    )}
                </div>
            </div>
        </div>
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
        <div className="flex flex-col gap-16 pb-20">
            {/* Hero Section */}
            <section className="bg-blue-900 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/30">Pakistan's #1 Wedding Prop Store</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        MAKE YOUR WEDDING <br/>
                        <span className="text-amber-400">GRAND & MEMORABLE</span>
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Premium quality currency bundles for showering at weddings, grand entries, and parties. High-speed delivery across all major cities of Pakistan.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#shop" className="bg-amber-500 hover:bg-amber-600 text-white font-black px-10 py-4 rounded-xl transition shadow-2xl shadow-amber-500/40 uppercase tracking-widest text-sm">Explore Shop</a>
                        <Link to="/auth" className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl transition backdrop-blur-md border border-white/20 uppercase tracking-widest text-sm">Register Account</Link>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">Fast Bus Delivery</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Urgent wedding? We ship via Daewoo and Faisal Movers terminal-to-terminal for same-day delivery.</p>
                    </div>
                    <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">High Quality Prints</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Our notes use premium laser printing that looks absolutely real in wedding videos and photos.</p>
                    </div>
                    <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04kM12 21.48l.342-1.333c1.246-.835 2.16-2.212 2.16-3.747a3.5 3.5 0 10-7 0c0 1.535.914 2.912 2.16 3.747L12 21.48z" /></svg>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">Secure Payments</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Safe 50% advance system via Easypaisa. Trusted by thousands of wedding families in Pakistan.</p>
                    </div>
                </div>
            </section>

            {/* Shop Section */}
            <section id="shop" className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-blue-900 uppercase tracking-tight">Available Inventory</h2>
                        <p className="text-slate-500 mt-2">Select the bundles for your upcoming event.</p>
                    </div>
                    <div className="w-full md:w-80 relative">
                        <input 
                            type="text" 
                            placeholder="Search bundles (10, 50, Gun...)" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3 text-sm focus:ring-2 focus:ring-blue-900 transition outline-none"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold uppercase tracking-widest">No bundles match your search.</p>
                    </div>
                )}
            </section>

            {/* Wedding Guide Section */}
            <section className="bg-slate-50 py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h3 className="text-3xl font-black text-blue-900 mb-6 uppercase leading-tight">Professional Wedding Tip</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                For the best showering effect on stage, we recommend using the <b>Electric Gold Money Gun</b> with our <b>10 Rupee Wedding Bundles</b>. It creates a continuous stream of cash that looks majestic in slow-motion videos.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                    Order at least 5 bundles for a full effect.
                                </li>
                                <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                    Use bus delivery for urgent weekend events.
                                </li>
                            </ul>
                            <Link to="/product/8" className="inline-block bg-blue-900 text-white font-bold px-8 py-3 rounded-xl uppercase tracking-widest text-xs">Buy Money Gun</Link>
                        </div>
                        <div className="w-full md:w-80 h-80 bg-blue-50 rounded-3xl border-8 border-white shadow-lg flex items-center justify-center overflow-hidden">
                             <div className="text-center p-8">
                                <div className="text-6xl mb-4">🎉</div>
                                <p className="text-blue-900 font-black uppercase text-sm tracking-widest">Celebrate In Style</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};