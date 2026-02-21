import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Upload, Clock, Fingerprint } from 'lucide-react';

const CountdownTimer: React.FC<{ onExpire: () => void }> = ({ onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (timeLeft === 0) {
            onExpire();
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft, onExpire]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-col items-center gap-2 my-8">
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <Clock className="w-3 h-3" /> Session Expiry
            </div>
            <div className="text-4xl font-black text-amber-500 tracking-tighter font-mono">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
        </div>
    );
};

export const AuthPage: React.FC = () => {
    const { user, signup, login, submitPaymentProof, resetSignup } = useAuth();
    const navigate = useNavigate();

    const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
    const [signupStep, setSignupStep] = useState<'details' | 'payment'>('details');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setSignupEmail(user.email);
            switch (user.status) {
                case 'pendingPayment': setSignupStep('payment'); break;
                case 'pendingAdminVerification':
                case 'verified': navigate('/dashboard'); break;
            }
        } else {
            setSignupStep('details');
            setName(''); setEmail(''); setPassword(''); setSignupEmail('');
        }
    }, [user, navigate]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (authMode === 'signup') {
                await signup(name, email, password);
            } else {
                await login(email, password);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Authentication failed.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };
    
    const handlePaymentSubmit = async () => {
        setError('');
        setLoading(true);
        try {
            await submitPaymentProof(signupEmail);
            navigate('/dashboard');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "An error occurred.";
            setError(message);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 flex justify-center items-center min-h-[80vh]">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-md w-full bg-white/5 backdrop-blur-3xl p-12 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-amber-500"></div>
                
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-[10px] font-black uppercase mb-8 text-center bg-red-500/10 p-4 rounded-xl border border-red-500/20 tracking-widest"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                    {signupStep === 'details' ? (
                         <motion.form 
                            key="details"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleAuth} 
                            className="space-y-6"
                        >
                            <div className="text-center mb-10">
                                <motion.div 
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                                >
                                    <Fingerprint className="w-10 h-10 text-blue-400" />
                                </motion.div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                                    {authMode === 'signup' ? 'IDENTITY ACCESS' : 'SECURE LOGIN'}
                                </h2>
                                <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mt-3">
                                    {authMode === 'signup' ? 'Verified Membership Only' : 'Enter Credentials'}
                                </p>
                            </div>

                            {authMode === 'signup' && (
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <User className="w-3 h-3" /> Username
                                    </label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-[11px] font-bold focus:ring-1 focus:ring-amber-500 outline-none transition-all hover:border-white/20" />
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Mail className="w-3 h-3" /> Email Terminal
                                </label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-[11px] font-bold focus:ring-1 focus:ring-amber-500 outline-none transition-all hover:border-white/20" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Lock className="w-3 h-3" /> Security Key
                                </label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-[11px] font-bold focus:ring-1 focus:ring-amber-500 outline-none transition-all hover:border-white/20" />
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                disabled={loading} 
                                className="w-full bg-white text-slate-950 font-black py-5 rounded-xl uppercase tracking-widest text-[10px] transition hover:bg-amber-400 active:scale-95 shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
                            >
                                {loading ? 'Initializing...' : (
                                    <>{authMode === 'signup' ? 'Generate Account' : 'Access Vault'} <ArrowRight className="w-4 h-4" /></>
                                )}
                            </motion.button>

                            <div className="text-center mt-6">
                                <button 
                                    type="button"
                                    onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')}
                                    className="text-[9px] font-black text-slate-500 hover:text-amber-500 uppercase tracking-widest transition"
                                >
                                    {authMode === 'signup' ? 'Already have an account? Login' : 'New here? Create an account'}
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div 
                            key="payment"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8 text-center"
                        >
                            <motion.div 
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="w-20 h-20 bg-amber-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                            >
                                <ShieldCheck className="w-10 h-10 text-amber-400" />
                            </motion.div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">CLEARANCE DEPOSIT</h2>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed">Remit <span className="text-amber-500 font-black text-xl">₨20</span> to authorize your identity for dashboard access.</p>
                            
                            <div className="bg-slate-950 border border-white/5 p-6 rounded-2xl group hover:border-amber-500/30 transition-all">
                                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-3">Authorized IBAN (Easypaisa)</p>
                                <p className="text-white font-mono text-lg font-bold tracking-widest break-all">PK76TMFB0000000040888058</p>
                            </div>

                            <CountdownTimer onExpire={() => { resetSignup(); }} />
                            
                            <label className="w-full inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-amber-500 text-slate-400 font-black py-4 px-6 rounded-xl transition cursor-pointer text-[10px] uppercase tracking-widest">
                                <Upload className="w-4 h-4" />
                                {screenshot ? `Manifest: ${screenshot.name.substring(0, 15)}...` : 'Upload Remittance Proof'}
                                <input type="file" accept="image/*" onChange={e => setScreenshot(e.target.files?.[0] || null)} className="hidden" />
                            </label>
                            
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePaymentSubmit} 
                                disabled={!screenshot || loading} 
                                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-5 rounded-xl uppercase tracking-widest text-[10px] shadow-xl active:scale-95 disabled:bg-slate-800 disabled:text-slate-600 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Verifying...' : (
                                    <>Submit Clearance <ShieldCheck className="w-4 h-4" /></>
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
