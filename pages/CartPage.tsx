import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { DELIVERY_COMPANIES } from '../constants';
import type { Order } from '../types';

const OrderProcessingModal: React.FC<{isProcessing: boolean; isSuccess: boolean; onComplete: () => void}> = ({isProcessing, isSuccess, onComplete}) => (
    <div className="fixed inset-0 bg-blue-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center border-b-8 border-amber-500 relative overflow-hidden">
            {isProcessing ? (
                <div className="py-12">
                    <div className="relative w-24 h-24 mx-auto mb-10">
                        <div className="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-blue-900 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04kM12 21.48l.342-1.333c1.246-.835 2.16-2.212 2.16-3.747a3.5 3.5 0 10-7 0c0 1.535.914 2.912 2.16 3.747L12 21.48z" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tighter mb-4">Verifying Transaction</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Securing manifest details and auditing settlement proof...</p>
                </div>
            ) : isSuccess ? (
                <div className="py-8">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">Manifest Confirmed</h3>
                    <p className="text-slate-500 font-medium mb-10">Your requisition has been successfully logged in the vault. Tracking will update shortly.</p>
                    <button onClick={onComplete} className="w-full bg-blue-900 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest shadow-xl shadow-blue-900/20">
                        View Order Status
                    </button>
                </div>
            ) : null}
        </div>
    </div>
);


export const CartPage: React.FC = () => {
    const { cart, removeFromCart, totalAmount, clearCart } = useCart();
    const { user, addOrder } = useAuth();
    const navigate = useNavigate();
    
    // Form States
    const [city, setCity] = useState('');
    const [deliveryCompany, setDeliveryCompany] = useState(DELIVERY_COMPANIES[0]);
    const [busTerminal, setBusTerminal] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    
    // UI States
    const [isConfirming, setIsConfirming] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const advanceAmount = totalAmount / 2;
    
    // Validation
    const isBus = deliveryCompany === 'Local Transport Bus';
    const isFormValid = 
        fullName.trim() !== '' && 
        phoneNumber.trim() !== '' && 
        address.trim() !== '' && 
        city.trim() !== '' &&
        (!isBus || busTerminal.trim() !== '');

    const handlePlaceOrder = () => {
        if (!user || user.status !== 'verified') {
            navigate('/auth');
            return;
        }
        setIsConfirming(true);
    };

    const handleFinalConfirm = () => {
        setIsProcessing(true);
        setIsConfirming(false);
        
        // Simulate premium processing delay
        setTimeout(() => {
            const newOrder: Order = {
                id: `ORD-LC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                items: cart,
                totalAmount,
                advancePaid: advanceAmount,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'Processing',
                city,
                deliveryCompany,
                busTerminal: isBus ? busTerminal : undefined,
                fullName,
                phoneNumber,
                address,
            };
            addOrder(newOrder);
            clearCart();
            setIsProcessing(false);
            setIsSuccess(true);
        }, 3500);
    };

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-200">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Manifest Empty</h2>
                <p className="text-slate-400 font-medium mb-12 max-w-sm mx-auto">No items selected for dispatch. Return to the archive to secure your lot.</p>
                <Link to="/" className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-black py-4 px-10 rounded-xl transition-all shadow-2xl shadow-blue-900/20 uppercase tracking-[0.2em] text-xs">
                    Browse Inventory
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
             {/* Progress Overlays */}
             {(isProcessing || isSuccess) && <OrderProcessingModal isProcessing={isProcessing} isSuccess={isSuccess} onComplete={() => navigate('/dashboard')} />}
             
             {isConfirming && (
                <div className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border-t-8 border-amber-500">
                        <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tighter">Financial Settlement</h2>
                        <div className="space-y-6 mb-10">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Required Advance (50%)</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-blue-900 tracking-tighter">{advanceAmount.toLocaleString()}</span>
                                    <span className="text-xs font-black text-amber-500 uppercase">PKR</span>
                                </div>
                            </div>
                            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">Easypaisa Settlement ID</span>
                                <p className="text-slate-900 font-mono font-bold text-lg break-all">PK76TMFB0000000040888058</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setIsConfirming(false)} className="flex-1 bg-slate-100 text-slate-500 font-black py-4 rounded-xl uppercase text-xs tracking-widest">
                                Cancel
                            </button>
                            <button onClick={handleFinalConfirm} className="flex-2 bg-blue-900 text-white font-black py-4 px-8 rounded-xl uppercase text-xs tracking-widest shadow-xl shadow-blue-900/20">
                                I Have Paid
                            </button>
                        </div>
                    </div>
                </div>
             )}

            <div className="mb-16">
                 <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Secure Checkout</h2>
                 <p className="text-slate-500 font-medium mt-2">Logistics Manifest & Final Settlement Proof</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Column: Requisition List & Logistics */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Items List */}
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="bg-slate-50 px-8 py-5 border-b border-slate-200">
                             <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.2em]">Inventory Selected</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {cart.map(item => (
                                <div key={item.id} className="p-8 flex flex-col sm:flex-row sm:items-center justify-between group transition-colors">
                                    <div className="flex items-start gap-8 mb-6 sm:mb-0">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-blue-900 font-mono text-xs font-black shadow-inner">
                                            #{item.id}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-xl uppercase tracking-tighter leading-none mb-2">{item.name}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-widest">Quantity: {item.quantity}</span>
                                                <span className="text-slate-300">|</span>
                                                <span className="text-xs font-bold text-slate-400 uppercase">Unit: {item.price.toLocaleString()} PKR</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-10">
                                        <p className="font-black text-blue-900 text-xl tracking-tighter">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px] font-black text-amber-500 ml-0.5">PKR</span></p>
                                        <button 
                                            onClick={() => removeFromCart(item.id)} 
                                            className="text-slate-300 hover:text-red-500 transition-colors p-3 bg-slate-50 hover:bg-red-50 rounded-xl"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                     {/* Logistics Form */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full pointer-events-none"></div>
                        
                        <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tighter flex items-center gap-4">
                            <span className="w-12 h-1.5 bg-blue-900 rounded-full"></span>
                            Logistics Manifest
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Authorized Recipient Name</label>
                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all outline-none font-bold" placeholder="Full Name..." />
                            </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Encrypted Phone Link</label>
                                <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all outline-none font-bold" placeholder="03xx xxxxxxx" />
                            </div>
                             <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary Shipping Address</label>
                                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all outline-none font-bold" placeholder="Street, Area, Landmark..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target City</label>
                                <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all outline-none font-bold" placeholder="City..." />
                            </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Preferred Courier Stream</label>
                                <select value={deliveryCompany} onChange={e => setDeliveryCompany(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all outline-none font-black appearance-none">
                                    {DELIVERY_COMPANIES.map(company => <option key={company} value={company}>{company}</option>)}
                                </select>
                            </div>
                            
                            {/* Terminal Logic */}
                            {isBus && (
                                <div className="md:col-span-2 space-y-4 bg-amber-50 p-8 rounded-2xl border border-amber-100 animate-in fade-in slide-in-from-top-4">
                                    <div>
                                        <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest block mb-2">Target Bus Terminal / Stop</label>
                                        <input 
                                            type="text" 
                                            value={busTerminal} 
                                            onChange={e => setBusTerminal(e.target.value)} 
                                            className="w-full bg-white border border-amber-200 rounded-xl p-4 text-slate-900 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none font-bold" 
                                            placeholder="e.g. Faisal Movers Terminal, Daewoo Chowk..." 
                                        />
                                    </div>
                                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest italic">* Terminal pickup is recommended for maximum discretion.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Financial Snapshot */}
                <div className="lg:col-span-4">
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_40px_80px_rgba(30,58,138,0.06)] p-10 sticky top-28">
                        <h3 className="text-xl font-black text-blue-900 mb-8 uppercase tracking-tighter border-b border-slate-100 pb-5">Acquisition Summary</h3>
                        
                        <div className="space-y-6 text-sm mb-10">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total Valuation</span>
                                <span className="text-slate-900 font-black text-lg tabular-nums">{totalAmount.toLocaleString()} PKR</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-amber-500 font-black uppercase tracking-widest text-[10px]">Required Deposit (50%)</span>
                                <span className="text-amber-600 font-black text-lg tabular-nums">{advanceAmount.toLocaleString()} PKR</span>
                            </div>
                             <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                <span className="font-black text-slate-900 text-sm uppercase tracking-widest">Due On Dispatch</span>
                                <span className="font-black text-blue-900 text-2xl tracking-tighter tabular-nums">{advanceAmount.toLocaleString()} PKR</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl mb-10">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] text-center leading-relaxed italic">
                                Final settlement occurs upon verification of dispatch. Requisitions are processed within 24 business hours.
                            </p>
                        </div>

                         <button
                            onClick={handlePlaceOrder}
                            disabled={!isFormValid}
                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-5 rounded-2xl transition-all duration-300 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-900/30 active:scale-95"
                        >
                            Confirm Requisition
                        </button>
                         
                         {!user || user.status !== 'verified' ? (
                            <div className="mt-6 flex items-center justify-center gap-3 text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span className="text-[10px] font-black uppercase tracking-widest">Identity Not Verified</span>
                            </div>
                        ) : !isFormValid ? (
                             <p className="text-center text-red-500 text-[10px] font-black uppercase mt-4 tracking-widest">Pending Logistics Data</p>
                        ) : null}
                    </div>
                </div>

            </div>
        </div>
    );
};