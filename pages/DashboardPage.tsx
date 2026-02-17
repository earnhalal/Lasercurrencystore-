import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const VerificationPending: React.FC = () => (
    <div className="container mx-auto px-4 py-32 text-center">
        <div className="max-w-md mx-auto bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500"></div>
            <div className="animate-pulse w-20 h-20 bg-amber-50 rounded-3xl mx-auto mb-10 flex items-center justify-center text-amber-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Security Audit</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">Your identity verification proof is being audited by our regional administrators. Dashboard access will unlock upon clearance.</p>
            <div className="inline-block px-4 py-2 bg-slate-50 rounded-full">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Expected Clearance: <span className="text-blue-900">5-15 MINS</span></p>
            </div>
        </div>
    </div>
);

type Tab = 'history' | 'settlement' | 'feedback' | 'inventory';

export const DashboardPage: React.FC = () => {
    const { user, orders } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('history');
    const [review, setReview] = useState('');
    const [submittedReview, setSubmittedReview] = useState(false);

    if (!user) {
        return <Navigate to="/auth" />;
    }
    
    if (user.status !== 'verified') {
        return <VerificationPending />;
    }

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(review.trim()){
            setSubmittedReview(true);
            setReview('');
             setTimeout(() => setSubmittedReview(false), 3000);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'inventory':
                return (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Master Inventory</h3>
                            <div className="flex-grow h-px bg-slate-100"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PRODUCTS.map(p => (
                                <div key={p.id} className="bg-white border border-slate-100 p-6 rounded-2xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">LC-{p.id}</span>
                                        <span className="text-slate-900 font-black uppercase text-sm tracking-tight">{p.name}</span>
                                    </div>
                                    <span className={`font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest ${p.status === 'available' ? 'bg-blue-50 text-blue-800' : 'bg-red-50 text-red-700'}`}>
                                        {p.status === 'available' ? p.price.toLocaleString() + ' PKR' : p.status.replace('-', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Acquisition Archives</h3>
                            <div className="flex-grow h-px bg-slate-100"></div>
                        </div>
                        {orders.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map(order => (
                                    <div key={order.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group">
                                        <div className="p-8">
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                                                <div className="flex flex-col">
                                                    <p className="font-mono font-black text-blue-900 text-xl tracking-tight">{order.id}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry: {order.date}</span>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Units: {order.items.reduce((s,i)=>s+i.quantity, 0)}</span>
                                                    </div>
                                                </div>
                                                <div className="text-left md:text-right">
                                                     <p className="text-2xl font-black text-slate-900 tabular-nums">{order.totalAmount.toLocaleString()} <span className="text-xs text-amber-500 ml-0.5">PKR</span></p>
                                                     <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-100 rounded-full">
                                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                                                     </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Authenticated Receiver</p>
                                                        <p className="font-black text-slate-900 uppercase text-sm">{order.fullName}</p>
                                                        <p className="text-xs font-bold text-slate-500 mt-1">{order.phoneNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Logistic Channel</p>
                                                        <p className="font-black text-slate-900 uppercase text-sm">{order.deliveryCompany}</p>
                                                        {order.busTerminal && (
                                                            <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100 w-fit">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Terminal: {order.busTerminal}</span>
                                                            </div>
                                                        )}
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 truncate">{order.address}, {order.city}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                                <p className="text-slate-300 font-black uppercase tracking-widest">No Acquisition Logs</p>
                            </div>
                        )}
                    </div>
                );
            case 'settlement':
                return (
                    <div className="animate-in fade-in duration-500">
                         <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Settlement Portal</h3>
                            <div className="flex-grow h-px bg-slate-100"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                            <div className="bg-white border border-slate-100 p-10 rounded-3xl shadow-sm">
                                <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">Corporate Vault Details</h4>
                                <div className="space-y-6">
                                    <p className="text-slate-500 font-medium text-sm">Authorized for all future balance settlements and requisitions.</p>
                                    <div className="bg-blue-900 p-8 rounded-2xl border-b-8 border-amber-500 shadow-xl shadow-blue-900/20">
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">Easypaisa IBAN</p>
                                        <p className="text-white font-mono font-black text-xl break-all leading-tight">PK76TMFB0000000040888058</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900 p-10 rounded-3xl shadow-xl border-t-8 border-blue-600">
                                <h4 className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-6">Internal Wallet Credits</h4>
                                <div className="flex flex-col items-center justify-center py-4">
                                     <span className="text-4xl font-black text-white tracking-tighter tabular-nums mb-2">{user.balance.toLocaleString()} <span className="text-sm text-blue-400 ml-0.5">PKR</span></span>
                                     <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Cleared Balance</span>
                                </div>
                            </div>
                        </div>

                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Verification Stream</h4>
                             {orders.length > 0 ? (
                                <div className="space-y-3">
                                    {orders.map(order => (
                                        <div key={order.id} className="bg-white border border-slate-100 p-5 rounded-2xl flex justify-between items-center group hover:border-blue-200 transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">REQUISITION {order.id}</span>
                                                <span className="text-slate-900 font-bold text-sm uppercase">Advance Clearance</span>
                                            </div>
                                            <span className="text-blue-900 font-black bg-blue-50 px-4 py-2 rounded-xl text-sm tabular-nums shadow-sm">+{order.advancePaid.toLocaleString()} PKR</span>
                                        </div>
                                    ))}
                                </div>
                             ) : (
                                <p className="text-slate-300 font-black uppercase tracking-widest text-center py-10 bg-slate-50 rounded-2xl">Void Stream</p>
                             )}
                    </div>
                );
            case 'feedback':
                 return (
                    <div className="animate-in fade-in duration-500">
                         <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Encrypted Feedback</h3>
                            <div className="flex-grow h-px bg-slate-100"></div>
                        </div>
                        {submittedReview ? (
                            <div className="bg-green-50 text-green-800 p-10 rounded-3xl border border-green-100 text-center animate-in zoom-in duration-500">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <p className="font-black text-2xl uppercase tracking-tighter mb-2">Message Recorded</p>
                                <p className="text-sm font-medium">Your experience has been logged for internal audit.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReviewSubmit} className="bg-white border border-slate-100 p-10 rounded-3xl shadow-sm">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Transmission Content</label>
                                <textarea
                                    value={review}
                                    onChange={e => setReview(e.target.value)}
                                    rows={8}
                                    placeholder="Enter your field report or service feedback..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 outline-none transition-all mb-8 resize-none font-medium text-sm"
                                ></textarea>
                                <button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white font-black py-4 px-12 rounded-xl transition-all duration-300 uppercase text-xs tracking-widest shadow-2xl shadow-blue-900/20 active:scale-95">
                                    Send Transmission
                                </button>
                            </form>
                        )}
                    </div>
                );
        }
    };

    const TabButton: React.FC<{tabId: Tab; label: string}> = ({tabId, label}) => (
         <button
            onClick={() => setActiveTab(tabId)}
            className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${activeTab === tabId ? 'bg-blue-900 text-white shadow-2xl shadow-blue-900/30 -translate-y-1' : 'text-slate-400 hover:text-blue-900'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-10">
                <div className="relative">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-amber-500 rounded-full"></div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Welcome, {user.name}</h2>
                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em] mt-3">Authorized Dashboard Interface</p>
                </div>
                 <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(30,58,138,0.04)] flex items-center gap-6 group hover:shadow-blue-900/5 transition-shadow">
                    <div className="w-16 h-16 bg-blue-900 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:rotate-6 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Liquid Balance</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">{user.balance.toLocaleString()} <span className="text-xs text-amber-500 font-black ml-0.5">PKR</span></p>
                    </div>
                 </div>
            </div>
            
            <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-4 md:p-10 border border-white">
                <div className="mb-16">
                    <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-6 scrollbar-hide">
                        <TabButton tabId="history" label="Archives" />
                        <TabButton tabId="inventory" label="Manifest" />
                        <TabButton tabId="settlement" label="Settlement" />
                        <TabButton tabId="feedback" label="Feedback" />
                    </div>
                </div>
                <div className="max-w-6xl mx-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};