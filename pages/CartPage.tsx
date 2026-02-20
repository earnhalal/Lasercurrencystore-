import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { DELIVERY_COMPANIES } from '../constants';
import type { Order } from '../types';

const OrderProcessingOverlay: React.FC<{isProcessing: boolean; isSuccess: boolean; onComplete: () => void}> = ({isProcessing, isSuccess, onComplete}) => {
    if (!isProcessing && !isSuccess) return null;

    return (
        <div className="fixed inset-0 bg-[#020617]/95 backdrop-blur-2xl flex items-center justify-center z-[200] p-6 text-center">
             <style>{`
                @keyframes laser-scan {
                    0% { top: 0; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .laser-line {
                    height: 2px;
                    background: #f59e0b;
                    box-shadow: 0 0 15px #f59e0b, 0 0 30px #f59e0b;
                    width: 100%;
                    position: absolute;
                    animation: laser-scan 2s infinite linear;
                }
            `}</style>
            
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 max-w-sm w-full shadow-[0_0_100px_rgba(30,58,138,0.2)] relative overflow-hidden">
                {isProcessing ? (
                    <>
                        <div className="relative w-32 h-40 bg-slate-900 mx-auto mb-8 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                            <div className="laser-line"></div>
                            <div className="text-4xl">🧾</div>
                        </div>
                        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">SECURE PROCESSING</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest animate-pulse">Scanning Manifest Details...</p>
                    </>
                ) : (
                    <>
                        <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">DISPATCH READY</h3>
                        <p className="text-xs text-slate-400 mb-10 font-bold uppercase tracking-widest">Transaction Verified Successfully</p>
                        <button onClick={onComplete} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] transition active:scale-95">
                            Access Dashboard
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
    
    // Form
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [delivery, setDelivery] = useState(DELIVERY_COMPANIES[0]);
    const [busTerminal, setBusTerminal] = useState('');

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
                id: `WED-ORD-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
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
        }, 3000);
    };

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="container mx-auto px-4 py-32 text-center max-w-lg">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-600 border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Inventory Cart Empty</h2>
                <p className="text-slate-500 mb-10 text-xs font-bold uppercase tracking-widest">No celebration series selected.</p>
                <Link to="/" className="inline-block bg-white text-slate-950 font-black py-4 px-10 rounded-xl transition shadow-xl uppercase tracking-widest text-[10px] active:scale-95">Browse Inventory</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <OrderProcessingOverlay isProcessing={isProcessing} isSuccess={isSuccess} onComplete={() => navigate('/dashboard')} />

            {isConfirming && (
                <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center z-[150] p-6">
                    <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Settlement Required</h3>
                        <p className="text-slate-400 mb-8 text-sm font-medium">To activate your dispatch, please remit <span className="text-amber-500 font-black underline">{(totalAmount / 2).toLocaleString()} PKR</span> (50% Advance) to the authorized terminal:</p>
                        
                        <div className="bg-white/5 p-6 rounded-2xl mb-10 border border-white/10 text-center">
                            <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em] block mb-2">Easypaisa Master Account</span>
                            <p className="text-2xl font-black text-white tracking-[0.2em] font-mono">03xx-xxxxxxx</p>
                            <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest italic">Title: LASER STORE OFFICIAL</p>
                        </div>
                        
                        <div className="flex gap-4">
                            <button onClick={() => setIsConfirming(false)} className="flex-1 py-4 text-slate-500 font-black uppercase text-[10px] tracking-widest">Cancel</button>
                            <button onClick={finalOrderSubmit} className="flex-1 bg-amber-500 text-slate-950 font-black py-4 rounded-xl uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/20 active:scale-95 transition">I Have Settled</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form Side */}
                <div className="lg:col-span-7 space-y-8">
                    <section className="bg-white/5 backdrop-blur-lg border border-white/5 p-10 rounded-[2.5rem] shadow-sm">
                        <h3 className="text-lg font-black text-white mb-8 border-b border-white/5 pb-4 uppercase tracking-tighter">01. Logistic Manifest</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Recipient Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                            <input type="tel" placeholder="Primary Contact" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                            <input type="text" placeholder="City of Destination" value={city} onChange={e => setCity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                            <select value={delivery} onChange={e => setDelivery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none">
                                {DELIVERY_COMPANIES.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                            </select>
                            <div className="md:col-span-2">
                                <input type="text" placeholder="Complete Street Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                            </div>
                            
                            {isBus && (
                                <div className="md:col-span-2 bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
                                    <label className="text-[9px] font-black text-amber-500 uppercase tracking-widest block mb-3">Bus Terminal / Cargo Stop Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Daewoo Terminal, Kalma Chowk" 
                                        value={busTerminal} 
                                        onChange={e => setBusTerminal(e.target.value)} 
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none" 
                                    />
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="bg-white/5 backdrop-blur-lg border border-white/5 p-10 rounded-[2.5rem] shadow-sm">
                        <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tighter">02. Acquisition List</h3>
                        <div className="divide-y divide-white/5">
                            {cart.map(item => (
                                <div key={item.id} className="py-6 flex justify-between items-center group">
                                    <div>
                                        <p className="font-black text-white text-sm uppercase tracking-tight">{item.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">Bundle Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-white tabular-nums text-sm">{(item.price * item.quantity).toLocaleString()} PKR</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-[9px] text-red-500 font-bold uppercase hover:underline mt-1 tracking-widest">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Summary Side */}
                <div className="lg:col-span-5">
                    <div className="bg-[#0f172a] text-white p-10 rounded-[3rem] sticky top-24 shadow-2xl border border-white/5">
                        <h3 className="text-xl font-black mb-10 border-b border-white/5 pb-6 uppercase tracking-tighter">Settlement Audit</h3>
                        
                        <div className="space-y-6 mb-12">
                            <div className="flex justify-between items-center text-slate-400">
                                <span className="text-[10px] font-black uppercase tracking-widest">Gross Valuation</span>
                                <span className="text-base font-bold">{totalAmount.toLocaleString()} PKR</span>
                            </div>
                            <div className="flex justify-between items-center text-amber-400">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Mandatory Advance (50%)</span>
                                <span className="text-3xl font-black tracking-tighter">{(totalAmount / 2).toLocaleString()} PKR</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/5 pt-6 text-slate-400">
                                <span className="text-[10px] font-black uppercase tracking-widest">Payable on Delivery</span>
                                <span className="text-base font-bold">{(totalAmount / 2).toLocaleString()} PKR</span>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={!isFormValid}
                            className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black py-5 rounded-2xl transition shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[10px] active:scale-95"
                        >
                            {isFormValid ? 'Activate Dispatch Manifest' : 'Complete Step 01'}
                        </button>
                        
                        <p className="text-[8px] text-center mt-8 text-slate-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
                            Authorized Transaction Protocol <br/> All Settlements Finalized After 24H
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};