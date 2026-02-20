import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const VerificationPending: React.FC = () => (
    <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-3xl mx-auto mb-10 flex items-center justify-center animate-pulse border border-amber-500/20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Settlement Audit</h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-10 text-sm">Our regional administrators are currently verifying your remittance proof. Access to the asset management dashboard will be granted post-verification.</p>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-900 rounded-full border border-white/5">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status: <span className="text-white">Awaiting Clearing</span></p>
            </div>
        </div>
    </div>
);

type Tab = 'manifest' | 'vault' | 'tier';

export const DashboardPage: React.FC = () => {
    const { user, orders } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('manifest');

    if (!user) {
        return <Navigate to="/auth" />;
    }
    
    if (user.status !== 'verified') {
        return <VerificationPending />;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'manifest':
                return (
                    <div className="animate-in fade-in duration-500 space-y-6">
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id} className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden p-10 group relative transition hover:border-amber-500/20">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 font-black text-xs border border-amber-500/20">LC</div>
                                            <div>
                                                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1">{order.id}</p>
                                                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-3xl font-black text-white tabular-nums tracking-tighter">{order.totalAmount.toLocaleString()} <span className="text-[10px] text-amber-500">PKR</span></p>
                                            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-500/20">
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
                                        <div>
                                            <h5 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Recipient Identity</h5>
                                            <p className="font-black text-white uppercase text-sm">{order.fullName}</p>
                                            <p className="text-xs text-slate-400 font-bold mt-1">{order.phoneNumber}</p>
                                            <p className="text-xs text-slate-500 mt-2 leading-relaxed italic">{order.address}, {order.city}</p>
                                        </div>
                                        <div>
                                            <h5 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Transit Protocol</h5>
                                            <p className="font-black text-white uppercase text-sm">{order.deliveryCompany}</p>
                                            {order.busTerminal && (
                                                <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-white/5 flex items-center gap-4">
                                                    <div className="text-xl">🚌</div>
                                                    <div>
                                                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Assigned Terminal</p>
                                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{order.busTerminal}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-32 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5">
                                <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">No active dispatches found in vault archive</p>
                                <Link to="/" className="text-amber-500 font-black text-[10px] mt-6 inline-block uppercase tracking-widest hover:underline">Begin Acquisition</Link>
                            </div>
                        )}
                    </div>
                );
            case 'vault':
                return (
                    <div className="animate-in fade-in duration-500 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 p-12 rounded-[3rem] text-white border border-white/5 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-6 block">Available Liquidity</span>
                            <div className="text-6xl font-black tracking-tighter tabular-nums mb-10">{user.balance.toLocaleString()} <span className="text-sm text-amber-500 ml-1">PKR</span></div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                                Assets available for application towards future bundle settlements.
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] flex flex-col justify-center text-center">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10">Authorized Settlement ID</span>
                            <div className="p-6 bg-slate-950 rounded-2xl border border-white/5 mb-8">
                                <p className="text-2xl font-black text-white font-mono tracking-widest">03xx-xxxxxxx</p>
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">Verify "LASER STORE" title before remit</p>
                        </div>
                    </div>
                );
            case 'tier':
                return (
                     <div className="animate-in fade-in duration-500 bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Client Hierarchy</h3>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-16">Engagement-based benefits program</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: 'Bronze Collector', perks: 'Standard Bus Transit', current: true },
                                { name: 'Silver Member', perks: '5% Multi-Pack Discount', current: false },
                                { name: 'Gold Wholesaler', perks: 'Priority Post-Pay Assets', current: false }
                            ].map(tier => (
                                <div key={tier.name} className={`p-8 rounded-[2rem] border transition-all ${tier.current ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-950 border-white/5'}`}>
                                    <div className="text-3xl mb-6">{tier.current ? '👑' : '🔒'}</div>
                                    <h4 className="font-black text-white uppercase text-[11px] mb-2">{tier.name}</h4>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{tier.perks}</p>
                                    {tier.current && <span className="inline-block mt-8 px-5 py-1.5 bg-amber-500 text-slate-950 text-[8px] font-black rounded-full uppercase tracking-widest">Active Level</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
                <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-gradient-to-tr from-blue-700 to-slate-900 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl border border-white/10">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Client Vault: {user.name.split(' ')[0]}</h1>
                        <p className="text-slate-500 font-black uppercase text-[9px] tracking-[0.4em] mt-3">Verified Institutional Member</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-2xl border border-white/5">
                    {(['manifest', 'vault', 'tier'] as Tab[]).map(t => (
                        <button 
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-amber-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
                        >
                            {t === 'manifest' ? 'Activity' : t === 'vault' ? 'Settlement' : 'Loyalty'}
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