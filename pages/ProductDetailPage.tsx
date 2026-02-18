import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '../constants';
import { useCart } from '../context/CartContext';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const productId = parseInt(id || '');
    const product = PRODUCTS.find(p => p.id === productId);

    const [quantity, setQuantity] = useState(5);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h2 className="text-3xl font-bold mb-6 text-slate-900">BUNDLE NOT FOUND</h2>
                <Link to="/" className="bg-blue-900 text-white py-4 px-10 rounded-xl font-bold uppercase text-xs">Return to Shop</Link>
            </div>
        );
    }

    const isAvailable = product.status === 'available';
    const totalPrice = product.price * quantity;
    const reviews = REVIEWS.filter(r => r.productId === product.id);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-900 transition mb-10 text-xs font-bold uppercase tracking-widest">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Shop
            </Link>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                {/* Details Section */}
                <div className="flex-grow p-10 md:p-16 border-r border-slate-50">
                    <div className="mb-10">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 block">Event Grade Replicas</span>
                        <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-6 uppercase tracking-tight">{product.name}</h1>
                        <p className="text-slate-500 text-lg leading-relaxed">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3">Usage Tip</h4>
                            <p className="text-sm text-blue-700 font-medium">Best for showering at wedding stages. These notes are lightweight and stay in the air longer than standard paper.</p>
                        </div>
                        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">Quality Check</h4>
                            <p className="text-sm text-amber-800 font-medium">Non-reflective coating ensuring they don't produce a glare when professional flash photography is used.</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Recent Customer Feedback</h4>
                        {reviews.length > 0 ? (
                            <div className="space-y-6">
                                {reviews.map((r, i) => (
                                    <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-slate-900">{r.author}</span>
                                            <span className="text-amber-500">★★★★★</span>
                                        </div>
                                        <p className="text-sm text-slate-500 italic">"{r.text}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm font-medium italic">No reviews for this pack yet. Be the first to try!</p>
                        )}
                    </div>
                </div>

                {/* Pricing / Cart Side */}
                <div className="w-full lg:w-96 bg-slate-50 p-10 flex flex-col justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center">
                        {isAvailable ? (
                            <>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Pack Total Cost</span>
                                <div className="text-5xl font-black text-blue-900 mb-10 tabular-nums">
                                    {totalPrice.toLocaleString()} <span className="text-sm text-amber-500 ml-0.5">PKR</span>
                                </div>

                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Quantity</label>
                                        <span className="text-[10px] font-bold text-blue-600 uppercase">Min 5 Bundle</span>
                                    </div>
                                    <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-200">
                                        <button 
                                            onClick={() => setQuantity(q => Math.max(5, q - 1))}
                                            className="w-12 h-12 flex items-center justify-center text-2xl font-bold text-slate-400 hover:text-blue-900 active:scale-95 transition"
                                        >
                                            -
                                        </button>
                                        <div className="flex-grow text-2xl font-black text-blue-900 tabular-nums">{quantity}</div>
                                        <button 
                                            onClick={() => setQuantity(q => Math.min(100, q + 1))}
                                            className="w-12 h-12 flex items-center justify-center text-2xl font-bold text-slate-400 hover:text-blue-900 active:scale-95 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => { addToCart(product, quantity); navigate('/cart'); }}
                                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-5 rounded-2xl transition shadow-xl shadow-blue-900/20 uppercase tracking-widest text-xs active:scale-95"
                                >
                                    Add to My Order
                                </button>
                                
                                <div className="mt-6 pt-6 border-t border-slate-50">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">
                                        Free bus delivery for <br/> orders over 20,000 PKR
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="py-10">
                                <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 uppercase mb-2">Unavailable</h3>
                                <p className="text-sm text-slate-500">This series is out of stock.</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="flex -space-x-2">
                             {[...Array(3)].map((_, i) => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>)}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">12 families bought this pack today</span>
                    </div>
                </div>
            </div>
        </div>
    );
};