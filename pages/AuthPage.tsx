
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CountdownTimer: React.FC<{ onExpire: () => void }> = ({ onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

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
        <div className="text-center text-5xl font-black text-blue-900 my-6 tracking-tighter">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export const AuthPage: React.FC = () => {
    const { user, signup, submitPaymentProof, resetSignup } = useAuth();
    const navigate = useNavigate();

    const [signupStep, setSignupStep] = useState<'details' | 'payment'>('details');
    
    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState(''); // To hold email for payment step
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // This effect handles navigation and signup step changes based on user status
    useEffect(() => {
        if (user) {
            setSignupEmail(user.email); // Keep track of the email for payment/reset
            switch (user.status) {
                case 'pendingPayment':
                    setSignupStep('payment');
                    break;
                case 'pendingAdminVerification':
                case 'verified':
                    navigate('/dashboard');
                    break;
            }
        } else {
            // If there's no user (logged out, reset), go back to details form
            setSignupStep('details');
            setName('');
            setEmail('');
            setPassword('');
            setSignupEmail('');
        }
    }, [user, navigate]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(name, email, password);
            // The useEffect will now handle transitioning to the payment step
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
            alert('Verification successful! Your account is now under review.');
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
            setLoading(false);
        }
        // No finally block for loading, as we navigate away on success.
    };
    
    const handleTimerExpire = () => {
        alert("Payment timer expired. Please start the signup process again.");
        resetSignup(signupEmail);
        // The useEffect will handle resetting the state to the 'details' page
    };

    const renderSignupFlow = () => {
        switch (signupStep) {
            case 'details': return (
                 <form onSubmit={handleSignup} className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Client Registration</h2>
                        <p className="text-slate-500 text-sm mt-2">Secure access for verified traders only.</p>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Username</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-1">
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>
            );
            case 'payment': return (
                <div className="space-y-6 text-center">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Unlock Dashboard</h2>
                    <p className="text-slate-600">Send <span className="text-blue-900 font-black text-lg">₨20</span> to verify your account.</p>
                    
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Easypaisa IBAN</p>
                        <p className="text-slate-900 font-mono mt-2 text-xl font-bold tracking-wide break-all">PK76TMFB0000000040888058</p>
                    </div>

                    <CountdownTimer onExpire={handleTimerExpire} />
                    
                    <div>
                         <label htmlFor="screenshot" className="w-full inline-block bg-white border border-slate-300 hover:border-blue-500 text-slate-600 font-bold py-3 px-4 rounded-lg transition cursor-pointer text-sm uppercase">
                            {screenshot ? `Selected: ${screenshot.name}` : 'Upload Transaction Proof'}
                        </label>
                        <input type="file" id="screenshot" accept="image/*" onChange={e => setScreenshot(e.target.files ? e.target.files[0] : null)} className="hidden" />
                    </div>
                    
                    <button onClick={handlePaymentSubmit} disabled={!screenshot || loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-1 disabled:bg-slate-300 disabled:shadow-none disabled:transform-none">
                        {loading ? 'Verifying...' : 'Submit Verification'}
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-2xl border border-slate-100">
                {error && <p className="text-red-600 text-sm mb-6 text-center bg-red-50 p-3 rounded-md font-bold">{error}</p>}
                {renderSignupFlow()}
            </div>
        </div>
    );
};
