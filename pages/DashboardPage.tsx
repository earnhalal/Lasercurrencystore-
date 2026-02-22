import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { 
    LayoutDashboard, 
    History, 
    Wallet, 
    User, 
    LogOut, 
    Clock, 
    Package, 
    MapPin, 
    Phone,
    ChevronRight,
    Settings,
    ShoppingBag,
    Plus,
    Trash2,
    CheckCircle2,
    AlertCircle
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

type Tab = 'overview' | 'shop' | 'orders' | 'balance' | 'profile';

export const DashboardPage: React.FC = () => {
    const { user, orders, logout, submitDeposit, deductBalance, addOrder } = useAuth();
    const { cart, addToCart, removeFromCart, clearCart, totalAmount } = useCart();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [depositAmount, setDepositAmount] = useState('');
    const [depositTxId, setDepositTxId] = useState('');
    const [isDepositing, setIsDepositing] = useState(false);
    const [depositSuccess, setDepositSuccess] = useState(false);
    const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!user) {
        return <Navigate to="/auth" />;
    }
    
    if (user.status !== 'verified') {
        return <VerificationPending />;
    }

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!depositAmount || !depositTxId) return;
        setIsDepositing(true);
        try {
            await submitDeposit(Number(depositAmount), depositTxId);
            setDepositSuccess(true);
            setDepositAmount('');
            setDepositTxId('');
            setTimeout(() => setDepositSuccess(false), 5000);
        } catch (err) {
            console.error(err);
        } finally {
            setIsDepositing(false);
        }
    };

    const handleCheckout = async () => {
        if (totalAmount > user.balance) {
            setCheckoutStatus('error');
            setTimeout(() => setCheckoutStatus('idle'), 3000);
            return;
        }

        setCheckoutStatus('loading');
        try {
            await deductBalance(totalAmount);
            
            const newOrder = {
                id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
                totalAmount: totalAmount,
                status: 'Processing',
                items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
                fullName: user.name,
                email: user.email,
                phoneNumber: '03xx-xxxxxxx', // Placeholder, should be in user profile
                address: 'Default Address',
                city: 'Default City',
                deliveryCompany: 'Leopard Courier'
            };

            await addOrder(newOrder as Order);
            clearCart();
            setCheckoutStatus('success');
            setTimeout(() => {
                setCheckoutStatus('idle');
                setActiveTab('orders');
            }, 2000);
        } catch (err) {
            console.error(err);
            setCheckoutStatus('error');
        }
    };

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
                                <button 
                                    onClick={() => setActiveTab('balance')}
                                    className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-4 py-2 rounded-full hover:bg-white/20 transition-all"
                                >
                                    <Plus className="w-3 h-3" /> Balance Add Karain
                                </button>
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
                                    History Dekhain <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h4 className="text-lg font-black text-white uppercase tracking-tighter">Shopping Shuru Karain</h4>
                                <p className="text-xs text-slate-400 font-medium mt-1">Hamare naye bundles check karain aur order dain.</p>
                            </div>
                            <button 
                                onClick={() => setActiveTab('shop')}
                                className="bg-amber-500 text-slate-950 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
                            >
                                Shop Now
                            </button>
                        </div>
                    </motion.div>
                );
            case 'shop':
                return (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Available Bundles</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {PRODUCTS.map(product => (
                                    <div key={product.id} className="bg-white/5 border border-white/5 rounded-[2rem] p-6 hover:border-amber-500/20 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center border border-white/5">
                                                <Package className="w-5 h-5 text-amber-500" />
                                            </div>
                                            <span className="text-[10px] font-black text-white">Rs. {product.price.toLocaleString()}</span>
                                        </div>
                                        <h4 className="text-sm font-black text-white uppercase mb-2">{product.name}</h4>
                                        <p className="text-[10px] text-slate-500 mb-6 line-clamp-2">{product.description}</p>
                                        <button 
                                            onClick={() => addToCart(product, 1)}
                                            className="w-full py-3 bg-white/5 hover:bg-amber-500 hover:text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/10"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 sticky top-24">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Shopping Cart</h3>
                                    <ShoppingBag className="w-4 h-4 text-slate-500" />
                                </div>
                                
                                {cart.length > 0 ? (
                                    <>
                                        <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            {cart.map(item => (
                                                <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="flex-grow">
                                                        <p className="text-[10px] font-black text-white uppercase truncate max-w-[120px]">{item.name}</p>
                                                        <p className="text-[9px] text-slate-500 font-bold">Rs. {item.price.toLocaleString()}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="p-1.5 text-slate-500 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-[10px] font-black text-white w-4 text-center">{item.quantity}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-6 border-t border-white/5 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Amount</span>
                                                <span className="text-xl font-black text-white tracking-tighter">Rs. {totalAmount.toLocaleString()}</span>
                                            </div>
                                            
                                            {checkoutStatus === 'error' && (
                                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-[9px] font-black uppercase">
                                                    <AlertCircle className="w-3 h-3" /> Balance Kam Hai!
                                                </div>
                                            )}

                                            <button 
                                                onClick={handleCheckout}
                                                disabled={checkoutStatus === 'loading'}
                                                className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                                    checkoutStatus === 'loading' ? 'bg-slate-800 text-slate-500' :
                                                    checkoutStatus === 'success' ? 'bg-emerald-500 text-white' :
                                                    'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
                                                }`}
                                            >
                                                {checkoutStatus === 'loading' ? 'Processing...' : 
                                                 checkoutStatus === 'success' ? <><CheckCircle2 className="w-4 h-4" /> Order Done!</> : 
                                                 'Checkout Karain'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Cart Khali Hai</p>
                                    </div>
                                )}
                            </div>
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
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Yeh balance aap shopping ke liye use kar saktay hain.</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem]">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Balance Add Karain</h4>
                            
                            <form onSubmit={handleDeposit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Amount (RS)</label>
                                        <input 
                                            type="number" 
                                            value={depositAmount}
                                            onChange={(e) => setDepositAmount(e.target.value)}
                                            placeholder="Kitna balance add karna hai?"
                                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-5 text-[11px] font-black text-white focus:ring-1 focus:ring-amber-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Transaction ID</label>
                                        <input 
                                            type="text" 
                                            value={depositTxId}
                                            onChange={(e) => setDepositTxId(e.target.value)}
                                            placeholder="Easypaisa/JazzCash ID"
                                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-5 text-[11px] font-black text-white focus:ring-1 focus:ring-amber-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-950 rounded-2xl border border-white/5">
                                    <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-2">Hamara Easypaisa Number</p>
                                    <p className="text-xl font-black text-white font-mono tracking-widest">03xx-xxxxxxx</p>
                                    <p className="text-[9px] text-slate-500 font-bold mt-2 italic uppercase">Title: LASER STORE</p>
                                </div>

                                {depositSuccess && (
                                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                        <CheckCircle2 className="w-4 h-4" /> Deposit Request Sent! 5 mins mein balance add ho jayega.
                                    </div>
                                )}

                                <button 
                                    type="submit"
                                    disabled={isDepositing}
                                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                                >
                                    {isDepositing ? 'Submitting...' : 'Deposit Request Bhejain'}
                                </button>
                            </form>
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
                        { id: 'shop', icon: ShoppingBag, label: 'Shop' },
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
                    { id: 'shop', icon: ShoppingBag },
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
