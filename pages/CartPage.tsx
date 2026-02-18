import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { DELIVERY_COMPANIES } from '../constants';
import type { Order } from '../types';

const OrderLoadingOverlay: React.FC<{isProcessing: boolean; isSuccess: boolean; onComplete: () => void}> = ({isProcessing, isSuccess, onComplete}) => {
    if (!isProcessing && !isSuccess) return null;

    return (
        <div className="fixed inset-0 bg-blue-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-6 text-center">
            <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
                {isProcessing ? (
                    <>
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-t-blue-900 rounded-full animate-spin"></div>
                        </div>
                        <h3 className="text-2xl font-black text-blue-900 mb-2 uppercase tracking-tight">Creating Order</h3>
                        <p className="text-slate-500 font-medium">Securing your celebration bundles. Please do not close this window...</p>
                    </>
                ) : (
                    <>
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Confirmed!</h3>
                        <p className="text-slate-500 mb-10 font-medium">We have received your celebration order. Our team will contact you shortly for dispatch.</p>
                        <button onClick={onComplete} className="w-full bg-blue-900 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-blue-900/20 active:scale-95 transition">
                            Go to My Account
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export const CartPage: React.FC = () => {
    const { cart, removeFromCart, totalAmount, clearCart } = useCart();
    const { user, addOrder } = useAuth();
    const navigate = useNavigate();
    
    // Form States
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [delivery, setDelivery] = useState(DELIVERY_COMPANIES[0]);
    const [busTerminal, setBusTerminal] = useState('');

    // UI States
    const [isConfirming, setIsConfirming] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const isBus = delivery === 'Local Transport Bus';
    const isFormValid = fullName && phone && city && address && (!isBus || busTerminal);

    const handlePlaceOrder = () => {
        if (!user || user.status !== 'verified') {
            navigate('/auth');
            return;
        }
        setIsConfirming(true);
    };

    const finalOrderSubmit = () => {
        setIsConfirming(false);
        setIsProcessing(true);
        
        setTimeout(() => {
            const newOrder: Order = {
                id: `ORD-WED-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                items: [...cart],
                totalAmount,
                advancePaid: totalAmount / 2,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'Processing',
                city,
                deliveryCompany: delivery,
                busTerminal: isBus ? busTerminal : undefined,
                fullName,
                phoneNumber: phone,
                address
            };
            addOrder(newOrder);
            clearCart();
            setIsProcessing(false);
            setIsSuccess(true);
        }, 3500);
    };

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="container mx-auto px-4 py-32 text-center max-w-lg">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Your cart is empty</h2>
                <p className="text-slate-500 mb-10">You haven't selected any bundles for your wedding yet. Browse our inventory to find the perfect celebration packs.</p>
                <Link to="/" className="inline-block bg-blue-900 text-white font-black py-4 px-10 rounded-xl transition shadow-xl shadow-blue-900/20 uppercase tracking-widest text-xs">Shop Bundles</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <OrderLoadingOverlay isProcessing={isProcessing} isSuccess={isSuccess} onComplete={() => navigate('/dashboard')} />

            {isConfirming && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-6">
                    <div className="bg-white rounded-[2rem] p-10 max-w-md w-full shadow-2xl border-t-8 border-amber-500">
                        <h3 className="text-2xl font-black text-blue-900 mb-4 uppercase tracking-tight">Advance Required</h3>
                        <p className="text-slate-600 mb-8 font-medium">To confirm your order, please pay <span className="text-slate-900 font-bold underline">{(totalAmount / 2).toLocaleString()} PKR</span> (50% Advance) to the following account:</p>
                        
                        <div className="bg-blue-50 p-6 rounded-2xl mb-10 border border-blue-100">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-2">Easypaisa Details</span>
                            <p className="text-xl font-black text-blue-900 tracking-wider">03xx-xxxxxxx</p>
                            <p className="text-sm font-bold text-slate-600 mt-1">Title: LASER STORE OFFICIAL</p>
                        </div>
                        
                        <div className="flex gap-4">
                            <button onClick={() => setIsConfirming(false)} className="flex-1 py-4 text-slate-400 font-bold uppercase text-xs tracking-widest">Cancel</button>
                            <button onClick={finalOrderSubmit} className="flex-1 bg-blue-900 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-blue-900/20">I Have Paid</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-12">
                <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tight">Finalize My Order</h1>
                <p className="text-slate-500 mt-2">Provide your delivery details below to secure your bundles.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form Side */}
                <div className="lg:col-span-7 space-y-10">
                    <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-blue-900 mb-8 border-b border-slate-50 pb-4 uppercase tracking-tight">1. Delivery Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recipient Full Name</label>
                                <input type="text" placeholder="Groom / Family Name..." value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Number</label>
                                <input type="tel" placeholder="03xx xxxxxxx" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">City</label>
                                <input type="text" placeholder="Lahore, Karachi..." value={city} onChange={e => setCity(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipping Method</label>
                                <select value={delivery} onChange={e => setDelivery(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-900 outline-none">
                                    {DELIVERY_COMPANIES.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complete House Address</label>
                                <input type="text" placeholder="Street, Area, Landmark..." value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                            </div>
                            
                            {isBus && (
                                <div className="md:col-span-2 bg-amber-50 p-6 rounded-2xl border border-amber-100 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest block mb-2">Transport Terminal Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Daewoo Terminal (Kalma Chowk), Faisal Movers Terminal" 
                                        value={busTerminal} 
                                        onChange={e => setBusTerminal(e.target.value)} 
                                        className="w-full bg-white border border-amber-200 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none" 
                                    />
                                    <p className="text-[10px] text-amber-600 font-bold mt-2 italic uppercase">* Bus delivery is faster for urgent events.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-blue-900 mb-6 border-b border-slate-50 pb-4 uppercase tracking-tight">2. Selected Bundles</h3>
                        <div className="divide-y divide-slate-50">
                            {cart.map(item => (
                                <div key={item.id} className="py-6 flex justify-between items-center group">
                                    <div>
                                        <p className="font-bold text-slate-900 group-hover:text-blue-900 transition">{item.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-widest">Qty: {item.quantity}</span>
                                            <span className="text-slate-300 text-xs">|</span>
                                            <span className="text-xs text-slate-400 font-medium">Unit Price: {item.price} PKR</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-blue-900">{(item.price * item.quantity).toLocaleString()} PKR</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 font-bold uppercase hover:underline mt-1">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Pricing / Action Side */}
                <div className="lg:col-span-5">
                    <div className="bg-blue-900 text-white p-10 rounded-[3rem] sticky top-24 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none"></div>
                        
                        <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6 uppercase tracking-tight">Financial Summary</h3>
                        
                        <div className="space-y-6 mb-12">
                            <div className="flex justify-between items-center text-white/60">
                                <span className="text-xs font-bold uppercase tracking-widest">Order Total Value</span>
                                <span className="text-lg font-bold">{totalAmount.toLocaleString()} PKR</span>
                            </div>
                            <div className="flex justify-between items-center text-amber-400">
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Required Advance (50%)</span>
                                <span className="text-3xl font-black tracking-tighter">{(totalAmount / 2).toLocaleString()} PKR</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/10 pt-6">
                                <span className="text-xs font-bold uppercase tracking-widest">Remaining on Delivery</span>
                                <span className="text-xl font-bold">{(totalAmount / 2).toLocaleString()} PKR</span>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={!isFormValid}
                            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-blue-800 disabled:opacity-50 text-white font-black py-6 rounded-2xl transition shadow-2xl shadow-amber-500/20 uppercase tracking-widest text-xs active:scale-95"
                        >
                            {isFormValid ? 'Place Order Now' : 'Complete Step 1'}
                        </button>
                        
                        <div className="mt-8 flex items-center justify-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest text-center">
                                Professional Wedding Support Active
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};