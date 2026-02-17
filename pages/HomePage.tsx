import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import type { Product, ProductStatus } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const isAvailable = product.status === 'available';
    const statusText = product.status === 'stock-end' ? 'Stock Ended' : product.status === 'coming-soon' ? 'Coming Soon' : 'Active Inventory';

    return (
        <Link to={`/product/${product.id}`} className={`group relative bg-white border border-slate-200 hover:border-amber-400 rounded-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(30,58,138,0.1)] flex flex-col h-full overflow-hidden ${!isAvailable ? 'opacity-70' : ''}`}>
            {/* Security Strip Pattern */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${isAvailable ? 'from-blue-900 via-blue-700 to-blue-900' : 'from-slate-300 via-slate-400 to-slate-300'}`}></div>
            
            <div className="p-7 flex flex-col flex-grow relative">
                {/* Guilloché Background Effect */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,_#1e3a8a_1px,transparent_1px)] [background-size:12px_12px]"></div>

                <div className="flex justify-between items-center mb-6">
                     <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">Serial #LC-{product.id.toString().padStart(4, '0')}</span>
                     </div>
                     <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${
                        product.status === 'available' ? 'bg-blue-50 text-blue-800 border-blue-100' : 
                        product.status === 'stock-end' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                     }`}>
                        {statusText}
                     </span>
                </div>

                <div className="mb-6 flex-grow">
                     <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-tight uppercase tracking-tight mb-3">
                        {product.name}
                     </h3>
                     <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
                        {product.description}
                     </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                     {isAvailable ? (
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Unit Valuation</p>
                            <span className="text-2xl font-black text-blue-900 tracking-tighter">
                                {product.price.toLocaleString()} <span className="text-xs text-amber-500 font-black ml-0.5">PKR</span>
                            </span>
                        </div>
                    ) : (
                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Inventory Locked</span>
                    )}
                    
                    <div className="h-10 w-10 rounded-full border border-slate-100 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const HighEndLogisticsSection: React.FC = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-32">
        <div className="bg-white rounded-[2rem] border border-blue-50 shadow-[0_40px_100px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/50 to-transparent pointer-events-none"></div>
            
            <div className="p-8 md:p-20 relative z-10">
                <div className="max-w-3xl mb-16">
                    <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">Logistics & Settlement</span>
                    <h2 className="text-4xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter leading-none mb-6">Authorized Trading Protocols</h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        Laser Currency Store operates on a high-trust verification model ensuring discreet handling and secure nationwide distribution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Protocol 1 */}
                    <div className="group">
                        <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04kM12 21.48l.342-1.333c1.246-.835 2.16-2.212 2.16-3.747a3.5 3.5 0 10-7 0c0 1.535.914 2.912 2.16 3.747L12 21.48z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase">50% Commitment</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Initial dispatch requires a 50% advance via authorized bank channels. This confirms buyer liquidity and priority.
                        </p>
                    </div>

                    {/* Protocol 2 */}
                    <div className="group">
                        <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase">Terminal Delivery</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Choose between direct residential dispatch via <strong>Pakistan Post</strong> or rapid terminal-to-terminal transport via <strong>Local Bus Services</strong>.
                        </p>
                    </div>

                    {/* Protocol 3 */}
                    <div className="group">
                        <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase">24hr Express Cycle</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Nationwide transit typically completes within 24-48 business hours. Orders are packaged in sterile, discreet shielding.
                        </p>
                    </div>
                </div>

                <div className="mt-20 p-8 bg-blue-900 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-b-8 border-amber-500">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-white font-bold uppercase tracking-wider text-sm">
                            Bulk Orders (100+ units) require specialized clearance.
                        </p>
                    </div>
                    <Link to="/auth" className="bg-amber-500 hover:bg-amber-600 text-white font-black py-3 px-8 rounded-lg uppercase text-xs tracking-widest transition-all">
                        Register Client Account
                    </Link>
                </div>
            </div>
        </div>
    </div>
);


export const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<ProductStatus | 'all'>('all');

    const filteredProducts = useMemo(() => {
        return PRODUCTS
            .filter(product => {
                if (filterStatus === 'all') return true;
                return product.status === filterStatus;
            })
            .filter(product => {
                const term = searchTerm.toLowerCase();
                return (
                    product.name.toLowerCase().includes(term) ||
                    product.description.toLowerCase().includes(term)
                );
            });
    }, [searchTerm, filterStatus]);

    const FilterButton: React.FC<{ status: ProductStatus | 'all', label: string }> = ({ status, label }) => (
        <button
            onClick={() => setFilterStatus(status)}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 border ${filterStatus === status ? 'bg-blue-900 text-white border-blue-900 shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-24 max-w-4xl mx-auto">
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-100">Official Repository</span>
                <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                    LASER <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-900 to-amber-600">CURRENCY</span>
                </h2>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                    Pakistan's most reliable inventory for high-fidelity currency replicas. Dedicated to cinematic professionals and private collectors.
                </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-20 flex flex-col items-center gap-10">
                <div className="relative w-full max-w-3xl group">
                    <div className="absolute inset-0 bg-blue-900/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <input
                        type="text"
                        placeholder="ENTER LOT ID OR SERIES NAME..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="relative w-full h-16 bg-white border border-slate-200 rounded-full pl-16 pr-8 text-slate-900 focus:ring-4 focus:ring-blue-900/5 focus:border-amber-400 transition-all outline-none uppercase text-xs font-black tracking-widest placeholder-slate-300"
                    />
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-6 top-1/2 -translate-y-1/2 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    <FilterButton status="all" label="Full Archive" />
                    <FilterButton status="available" label="Ready For Dispatch" />
                    <FilterButton status="stock-end" label="Manifest Ended" />
                    <FilterButton status="coming-soon" label="Future Releases" />
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-2xl text-slate-400 font-black uppercase tracking-tight">Zero Records Matches</h3>
                    <p className="text-slate-400 font-medium">Clear search parameters to see the full repository.</p>
                </div>
            )}
            
            <HighEndLogisticsSection />
        </div>
    );
};