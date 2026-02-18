import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const VerificationPending: React.FC = () => (
    <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full mx-auto mb-10 flex items-center justify-center animate-pulse">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Audit In Progress</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">We are verifying your account deposit. Dashboard access will be granted within 5-15 minutes once verified.</p>
            <div className="inline-block px-6 py-2 bg-slate-50 rounded-full border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status: <span className="text-blue-900">AWAITING ADMIN</span></p>
            </div>
        </div>
    </div>
);

type Tab = 'history' | 'wallet' | 'feedback';

export const DashboardPage: React.FC = () => {
    const { user, orders } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('history');
    const [feedback, setFeedback] = useState('');
    const [sent, setSent] = useState(false);

    if (!user) {
        return <Navigate to="/auth" />;
    }
    
    if (user.status !== 'verified') {
        return <VerificationPending />;
    }

    const handleFeedback = (e: React.FormEvent) => {
        e.preventDefault();
        if (feedback.trim()) {
            setSent(true);
            setFeedback('');
            setTimeout(() => setSent(false), 3000);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'history':
                return (
                    <div className="animate-in fade-in duration-500">
                        {orders.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map(order => (
                                    <div key={order.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all p-8">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                            <div>
                                                <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-1">{order.id}</p>
                                                <p className="text-slate-400 text-[10px] font-bold uppercase">{order.date}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xl font-black text-slate-900 tabular-nums">{order.totalAmount.toLocaleString()} PKR</span>
                                                <span className="px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">{order.status}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                                            <div>
                                                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Delivery To</h5>
                                                <p className="font-bold text-slate-900 uppercase text-sm">{order.fullName}</p>
                                                <p className="text-xs text-slate-500 mt-1">{order.phoneNumber}</p>
                                                <p className="text-xs text-slate-400 mt-1 truncate">{order.address}, {order.city}</p>
                                            </div>
                                            <div>
                                                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Shipping Via</h5>
                                                <p className="font-bold text-slate-900 uppercase text-sm">{order.deliveryCompany}</p>
                                                {order.busTerminal && (
                                                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Terminal: {order.busTerminal}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                                <p className="text-slate-300 font-bold uppercase tracking-widest">No wedding orders yet.</p>
                                <Link to="/" className="text-blue-900 font-bold text-sm mt-4 inline-block hover:underline">Browse Bundles Now</Link>
                            </div>
                        )}
                    </div>
                );
            case 'wallet':
                return (
                    <div className="animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-blue-900 p-10 rounded-[2.5rem] text-white shadow-2xl">
                                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.3em] mb-4 block">Available Balance</span>
                                <div className="text-5xl font-black tracking-tighter tabular-nums mb-8">{user.balance.toLocaleString()} <span className="text-sm text-amber-400 ml-0.5 uppercase">PKR</span></div>
                                <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                                    <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest leading-relaxed italic">Cleared balance for your next celebration order.</p>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Deposit Details</h4>
                                <div className="space-y-6">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                         <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Official Easypaisa</p>
                                         <p className="text-lg font-black text-blue-900">03xx-xxxxxxx</p>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Use this account for all future order advance payments. Please send screenshot to our WhatsApp after payment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'feedback':
                return (
                    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
                        {sent ? (
                            <div className="bg-green-50 text-green-700 p-10 rounded-3xl border border-green-100 text-center animate-in zoom-in duration-300">
                                <p className="font-black text-2xl uppercase tracking-tight mb-2">Thank You!</p>
                                <p className="text-sm font-medium">Your feedback helps us make your celebrations better.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedback} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm">
                                <h4 className="text-xl font-bold text-blue-900 mb-8 uppercase tracking-tight">How was your experience?</h4>
                                <textarea 
                                    rows={6} 
                                    value={feedback}
                                    onChange={e => setFeedback(e.target.value)}
                                    placeholder="Tell us about the quality of the notes and delivery..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 outline-none focus:ring-2 focus:ring-blue-900 transition mb-8 text-sm font-medium"
                                ></textarea>
                                <button type="submit" className="bg-blue-900 text-white font-black py-4 px-12 rounded-xl shadow-xl shadow-blue-900/20 uppercase tracking-widest text-xs active:scale-95 transition">Submit Feedback</button>
                            </form>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div>
                    <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tight">Welcome, {user.name}</h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Personal Celebration Dashboard</p>
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                    {(['history', 'wallet', 'feedback'] as Tab[]).map(t => (
                        <button 
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition whitespace-nowrap border ${activeTab === t ? 'bg-blue-900 text-white border-blue-900 shadow-xl' : 'bg-white text-slate-500 border-slate-200'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[500px]">
                {renderTabContent()}
            </div>
        </div>
    );
};