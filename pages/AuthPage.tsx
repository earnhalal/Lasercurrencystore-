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
        <div className="text-center text-4xl font-bold text-amber-400 my-4">
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
                 <form onSubmit={handleSignup} className="space-y-4">
                    <h2 className="text-3xl font-bold text-center text-white mb-6">Create Your Account</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'Creating...' : 'Sign Up'}</button>
                </form>
            );
            case 'payment': return (
                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Unlock Your Dashboard</h2>
                    <p className="text-gray-300 mb-4">Send <span className="text-white font-bold">₨20</span> to verify your account.</p>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <p className="text-gray-400">Easypaisa IBAN:</p>
                        <p className="text-white font-mono mt-1 text-lg">PK76TMFB0000000040888058</p>
                    </div>
                    <CountdownTimer onExpire={handleTimerExpire} />
                    <div>
                         <label htmlFor="screenshot" className="w-full inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition cursor-pointer">
                            {screenshot ? `Selected: ${screenshot.name}` : 'Upload Payment Screenshot'}
                        </label>
                        <input type="file" id="screenshot" accept="image/*" onChange={e => setScreenshot(e.target.files ? e.target.files[0] : null)} className="hidden" />
                    </div>
                    <button onClick={handlePaymentSubmit} disabled={!screenshot || loading} className="w-full btn-primary">
                        {loading ? 'Submitting...' : 'I Pay'}
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
            <div className="max-w-md w-full bg-gray-800/50 p-8 rounded-lg shadow-lg border border-purple-500/30">
                <style>{`
                    .btn-primary { 
                        background: linear-gradient(to right, #f59e0b, #8b5cf6); 
                        color: white; 
                        font-weight: bold; 
                        padding: 0.75rem 0; 
                        border-radius: 0.5rem; 
                        transition: all 0.3s ease-in-out;
                        box-shadow: 0 0 5px rgba(139, 92, 246, 0);
                    } 
                    .btn-primary:hover { 
                        opacity: 0.9; 
                        transform: translateY(-2px);
                        box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
                    } 
                    .btn-primary:disabled { 
                        background: #4b5563; 
                        opacity: 0.5;
                        cursor: not-allowed;
                        box-shadow: none;
                        transform: translateY(0);
                    }
                `}</style>
                {error && <p className="text-red-400 text-sm mb-4 text-center bg-red-900/50 p-2 rounded-md">{error}</p>}
                {renderSignupFlow()}
            </div>
        </div>
    );
};