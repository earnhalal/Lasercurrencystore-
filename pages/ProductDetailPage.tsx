import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '../constants';
import { useCart } from '../context/CartContext';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-3.5 h-3.5 ${filled ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

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
                <h2 className="text-4xl text-slate-900 font-black mb-6 uppercase tracking-tighter">Manifest Entry Void</h2>
                <Link to="/" className="inline-block bg-blue-900 text-white font-black py-3 px-8 rounded-lg uppercase text-xs tracking-widest shadow-xl shadow-blue-900/20">
                    Return To Archive
                </Link>
            </div>
        );
    }

    const increaseQty = () => {
        if (quantity < 100) setQuantity(q => q + 1);
    };
    const decreaseQty = () => {
        if (quantity > 5) setQuantity(q => q - 1);
    };
    
    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    const isAvailable = product.status === 'available';
    const totalPrice = product.price * quantity;
    const productReviews = REVIEWS.filter(r => r.productId === product.id);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-6xl mx-auto">
                <Link to="/" className="inline-flex items-center text-slate-400 hover:text-blue-900 mb-10 transition text-[10px] font-black uppercase tracking-widest group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Archive Inventory
                </Link>

                <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(30,58,138,0.08)]">
                    <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                        
                        {/* Left Panel: Specifications */}
                        <div className="lg:col-span-3 p-10 md:p-16 border-r border-slate-100 relative">
                             {/* Decorative Strip */}
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 via-blue-900 to-amber-400"></div>
                            
                            <div className="mb-10">
                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-blue-100">Authenticated Entry LC-{product.id}</span>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter mb-8">{product.name}</h1>
                                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">{product.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-dashed border-slate-200">
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Print Specifications</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-blue-900 rounded-full"></div>
                                            <span className="text-sm font-bold text-slate-700 uppercase">Laser High-Def Density</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-blue-900 rounded-full"></div>
                                            <span className="text-sm font-bold text-slate-700 uppercase">Bond Texture Simulation</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Security Level</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                                            <span className="text-sm font-bold text-slate-700 uppercase">Non-Reflective Coating</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                                            <span className="text-sm font-bold text-slate-700 uppercase">Cinematic Grade Prop</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Acquisition */}
                        <div className="lg:col-span-2 bg-slate-50/50 p-10 md:p-16 flex flex-col justify-center">
                            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 relative overflow-hidden">
                                 {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(45deg,_#1e3a8a,_#1e3a8a_1px,_transparent_1px,_transparent_10px)]"></div>

                                {isAvailable ? (
                                    <>
                                        <div className="text-center mb-10">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Total Manifest Value</span>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-5xl font-black text-blue-900 tracking-tighter">{totalPrice.toLocaleString()}</span>
                                                <span className="text-sm font-black text-amber-500 uppercase">PKR</span>
                                            </div>
                                        </div>

                                        <div className="mb-10 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Order Quantity</label>
                                                <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">MIN 5 / MAX 100</span>
                                            </div>
                                            <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-200">
                                                <button 
                                                    onClick={decreaseQty}
                                                    disabled={quantity <= 5}
                                                    className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 hover:text-blue-900 disabled:opacity-30 disabled:cursor-not-allowed font-black text-xl transition-all active:scale-95"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                                                </button>
                                                <div className="flex-grow text-center">
                                                    <span className="text-3xl font-black text-blue-900 tabular-nums">{quantity}</span>
                                                </div>
                                                <button 
                                                    onClick={increaseQty}
                                                    disabled={quantity >= 100}
                                                    className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 hover:text-blue-900 disabled:opacity-30 disabled:cursor-not-allowed font-black text-xl transition-all active:scale-95"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={handleAddToCart}
                                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 uppercase text-xs tracking-[0.2em] shadow-2xl shadow-blue-900/30 flex justify-center items-center group active:scale-95">
                                            <span>Add To Manifest</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center py-16">
                                         <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m1-7l-1 1 1 1 1-1-1-1zm2-2l-1 1 1 1 1-1-1-1zM4.93 4.93l.08.08m13.98 13.98l.08.08" />
                                            </svg>
                                         </div>
                                         <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Manifest Closed</p>
                                         <p className="text-sm text-slate-500 mt-2 font-medium">This series is currently out of stock.</p>
                                    </div>
                                )}
                                
                                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="flex mb-1">
                                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < 4} />)}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Satisfaction</span>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-lg font-black text-blue-900 leading-none">24H</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dispatch Loop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-32">
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Verified Client Feedback</h2>
                        <div className="flex-grow h-px bg-slate-100"></div>
                    </div>
                    {productReviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {productReviews.map((review, index) => (
                                <div key={index} className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-[10px] font-black text-white">{review.author.charAt(0)}</div>
                                            <p className="font-black text-slate-900 uppercase text-xs tracking-widest">{review.author}</p>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium italic">"{review.text}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                             <p className="text-slate-400 font-black uppercase tracking-widest">Zero Public Reviews Recorded</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};