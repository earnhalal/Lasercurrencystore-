import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
    LayoutDashboard, 
    History, 
    Wallet, 
    User, 
    LogOut, 
    ShieldCheck, 
    Clock, 
    Package, 
    MapPin, 
    Phone,
    ChevronRight,
    Settings
} from 'lucide-react';

const VerificationPending: React.FC = () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-3xl mx-auto mb-8 flex items-center justify-center animate-pulse border border-amber-500/20">
                 <Clock className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Checking Payment</h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-8 text-sm">Hum aapki payment check kar rahe hain. Verification ke baad aapka dashboard khul jayega. Thora intezar karen.</p>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-900 rounded-full border border-white/5">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status: <span className="text-white">Pending</span></p>
            </div>
        </div>
    </div>
);

type Tab = 'overview' | 'orders' | 'balance' | 'profile';

export const DashboardPage: React.FC = () => {
    const { user, orders, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    if (!user) {
        return <Navigate to="/auth" />;
    }
    
    if (user.status !== 'verified') {
        return <VerificationPending />;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Mera Balance</p>
                                <h3 className="text-4xl font-black tracking-tighter tabular-nums">Rs. {user.balance.toLocaleString()}</h3>
                                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-3 py-1 rounded-full">
                                    <ShieldCheck className="w-3 h-3" /> Verified Account
                                </div>
                            </div>
                            <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Orders</p>
                                    <h3 className="text-4xl font-black text-white tracking-tighter tabular-nums">{orders.length}</h3>
                                </div>
                                <button 
                                    onClick={() => setActiveTab('orders')}
                                    className="mt-6 flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest hover:gap-3 transition-all"
                                >
                                    View History <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Recent Activity</h4>
                            {orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.slice(0, 3).map(order => (
                                        <div key={order.id} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{order.id}</p>
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase">{order.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-white">Rs. {order.totalAmount.toLocaleString()}</p>
                                                <p className="text-[8px] text-blue-400 font-black uppercase tracking-widest">{order.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-10 text-slate-500 text-[10px] font-black uppercase tracking-widest">Abhi tak koi order nahi hai</p>
                            )}
                        </div>
                    </motion.div>
                );
            case 'orders':
                return (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Order History</h3>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id} className="bg-white/5 border border-white/5 rounded-[2rem] p-8 hover:border-amber-500/20 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-amber-500/30 transition-all">
                                                <Package className="w-6 h-6 text-amber-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">{order.id}</p>
                                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-white tabular-nums tracking-tighter">Rs. {order.totalAmount.toLocaleString()}</p>
                                            <span className="inline-block mt-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-500/20">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                                        <div className="space-y-2">
                                            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Delivery Details</p>
                                            <p className="text-[11px] font-black text-white uppercase">{order.fullName}</p>
                                            <p className="text-[10px] text-slate-400 flex items-center gap-2"><Phone className="w-3 h-3" /> {order.phoneNumber}</p>
                                            <p className="text-[10px] text-slate-500 flex items-center gap-2"><MapPin className="w-3 h-3" /> {order.address}, {order.city}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Courier</p>
                                            <p className="text-[11px] font-black text-white uppercase">{order.deliveryCompany}</p>
                                            {order.busTerminal && (
                                                <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-white/5">
                                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Terminal</p>
                                                    <p className="text-[10px] font-black text-white uppercase">{order.busTerminal}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                                <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Koi orders nahi mile</p>
                            </div>
                        )}
                    </motion.div>
                );
            case 'balance':
                return (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 rounded-bl-full pointer-events-none"></div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8">Mera Balance</h3>
                            <div className="text-6xl font-black text-white tracking-tighter tabular-nums mb-4">
                                Rs. {user.balance.toLocaleString()}
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Yeh balance aap aglay orders mein use kar saktay hain.</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem]">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Payment Info</h4>
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-950 rounded-2xl border border-white/5">
                                    <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-2">Hamara Easypaisa Number</p>
                                    <p className="text-xl font-black text-white font-mono tracking-widest">03xx-xxxxxxx</p>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                                    <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
                                        Payment karnay se pehlay hamesha "LASER STORE" title check karain.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'profile':
                return (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-slate-900 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black border border-white/10 shadow-2xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{user.name}</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{user.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-950 rounded-2xl border border-white/5">
                                    <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-2">Account Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        <p className="text-xs font-black text-white uppercase tracking-widest">Verified Member</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-950 rounded-2xl border border-white/5">
                                    <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-2">Member Since</p>
                                    <p className="text-xs font-black text-white uppercase tracking-widest">Feb 2026</p>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/5 space-y-4">
                                <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Settings className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                        <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Account Settings</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                </button>
                                <button 
                                    onClick={() => logout()}
                                    className="w-full flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/10 hover:bg-red-500/10 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <LogOut className="w-4 h-4 text-red-500" />
                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Logout Karain</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-red-900" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
            {/* Sidebar Desktop */}
            <aside className="fixed left-0 top-0 bottom-0 w-72 bg-slate-950 border-r border-white/5 hidden lg:flex flex-col p-8 z-50">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-10 h-10 bg-blue-600/20 flex items-center justify-center rounded-xl border border-blue-500/30">
                        <span className="text-blue-400 font-black text-lg">LC</span>
                    </div>
                    <h3 className="font-black text-xl text-white uppercase tracking-tighter leading-none">
                        DASHBOARD
                    </h3>
                </div>

                <nav className="space-y-2 flex-grow">
                    {[
                        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                        { id: 'orders', icon: History, label: 'Orders' },
                        { id: 'balance', icon: Wallet, label: 'Balance' },
                        { id: 'profile', icon: User, label: 'Profile' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as Tab)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === item.id 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                                : 'text-slate-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-8 border-t border-white/5">
                    <button 
                        onClick={() => logout()}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 pb-32 lg:pb-12">
                {/* Mobile Header */}
                <header className="lg:hidden p-6 flex items-center justify-between border-b border-white/5 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600/20 flex items-center justify-center rounded-lg border border-blue-500/30">
                            <span className="text-blue-400 font-black text-sm">LC</span>
                        </div>
                        <h3 className="font-black text-sm text-white uppercase tracking-tighter">DASHBOARD</h3>
                    </div>
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border border-white/10"
                    >
                        <User className="w-4 h-4 text-slate-400" />
                    </button>
                </header>

                <div className="p-6 lg:p-12 max-w-5xl mx-auto">
                    <div className="mb-12 hidden lg:block">
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Welcome back, {user.name.split(' ')[0]}!
                        </h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                            Aapka account verified hai.
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {renderTabContent()}
                    </AnimatePresence>
                </div>
            </main>

            {/* Bottom Nav Mobile */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-2xl border-t border-white/5 p-4 flex justify-around items-center z-50">
                {[
                    { id: 'overview', icon: LayoutDashboard },
                    { id: 'orders', icon: History },
                    { id: 'balance', icon: Wallet },
                    { id: 'profile', icon: User },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as Tab)}
                        className={`p-4 rounded-2xl transition-all ${
                            activeTab === item.id 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'text-slate-500'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                    </button>
                ))}
            </nav>
        </div>
    );
};
