import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
        <div className="text-center text-4xl font-black text-amber-500 my-8 tracking-tighter font-mono">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export const AuthPage: React.FC = () => {
    const { user, signup, submitPaymentProof, resetSignup } = useAuth();
    const navigate = useNavigate();

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

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(name, email, password);
        } catch (err: any) {
            setError(err.message || 'Signup failed.');
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
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 flex justify-center items-center">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-3xl p-12 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-amber-500"></div>
                
                {error && <p className="text-red-500 text-[10px] font-black uppercase mb-8 text-center bg-red-500/10 p-4 rounded-xl border border-red-500/20 tracking-widest">{error}</p>}
                
                {signupStep === 'details' ? (
                     <form onSubmit={handleSignup} className="space-y-6">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">IDENTITY ACCESS</h2>
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mt-3">Verified Membership Only</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-[11px] font-bold focus:ring-1 focus:ring-amber-500 outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Terminal</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-[11px] font-bold focus:ring-1 focus:ring-amber-500 outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-[11px] font-bold focus:ring-1 focus:ring-amber-500 outline-none" />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-white text-slate-950 font-black py-5 rounded-xl uppercase tracking-widest text-[10px] transition hover:bg-amber-400 active:scale-95 shadow-xl disabled:opacity-50">
                            {loading ? 'Initializing...' : 'Generate Account'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-8 text-center">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">CLEARANCE DEPOSIT</h2>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed">Remit <span className="text-amber-500 font-black text-xl">₨20</span> to authorize your identity for dashboard access.</p>
                        
                        <div className="bg-slate-950 border border-white/5 p-6 rounded-2xl">
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-3">Authorized IBAN (Easypaisa)</p>
                            <p className="text-white font-mono text-lg font-bold tracking-widest break-all">PK76TMFB0000000040888058</p>
                        </div>

                        <CountdownTimer onExpire={() => { resetSignup(signupEmail); }} />
                        
                        <label className="w-full inline-block bg-white/5 border border-white/10 hover:border-amber-500 text-slate-400 font-black py-4 px-6 rounded-xl transition cursor-pointer text-[10px] uppercase tracking-widest">
                            {screenshot ? `Manifest: ${screenshot.name.substring(0, 15)}...` : 'Upload Remittance Proof'}
                            <input type="file" accept="image/*" onChange={e => setScreenshot(e.files?.[0] || null)} className="hidden" />
                        </label>
                        
                        <button onClick={handlePaymentSubmit} disabled={!screenshot || loading} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-5 rounded-xl uppercase tracking-widest text-[10px] shadow-xl active:scale-95 disabled:bg-slate-800 disabled:text-slate-600">
                            {loading ? 'Verifying...' : 'Submit Clearance'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};