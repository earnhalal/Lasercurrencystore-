import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const VerificationPending: React.FC = () => (
    <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto bg-gray-800/50 p-8 rounded-lg shadow-lg border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Account Pending Verification</h2>
            <p className="text-gray-300">Your payment is being verified. This may take a few moments. The dashboard will unlock automatically once your account is approved.</p>
            <p className="mt-4 text-sm text-gray-400">Real users only — fake signups will not unlock dashboard.</p>
        </div>
    </div>
);

type Tab = 'history' | 'status' | 'payments' | 'reviews' | 'products';

export const DashboardPage: React.FC = () => {
    const { user, orders } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('history');
    const [review, setReview] = useState('');
    const [submittedReview, setSubmittedReview] = useState(false);
    const [trackingNumbers, setTrackingNumbers] = useState<Record<string, string>>({});
    const [trackingStatuses, setTrackingStatuses] = useState<Record<string, string | null>>({});


    if (!user) {
        return <Navigate to="/auth" />;
    }
    
    if (user.status !== 'verified') {
        return <VerificationPending />;
    }

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(review.trim()){
            console.log("Review submitted:", review);
            setSubmittedReview(true);
            setReview('');
             setTimeout(() => setSubmittedReview(false), 3000); // Reset after 3 seconds
        }
    };
    
    const handleTrackingNumberChange = (orderId: string, value: string) => {
        setTrackingNumbers(prev => ({ ...prev, [orderId]: value }));
    };

    const handleTrackOrder = (orderId: string, deliveryCompany: string, city: string) => {
        const trackingNumber = trackingNumbers[orderId];
        if (!trackingNumber || trackingNumber.trim() === '') {
            setTrackingStatuses(prev => ({ ...prev, [orderId]: 'Please enter a valid tracking number.' }));
            return;
        }

        const mockStatuses = [
            `Shipment information received by ${deliveryCompany}.`,
            `Package departed from our facility.`,
            `In transit to ${city} sorting center.`,
            `Package arrived at ${deliveryCompany} hub in ${city}.`,
            `Out for delivery. Estimated arrival: Today.`,
            `Delivery attempt made. Will re-attempt tomorrow.`
        ];
        
        const hash = trackingNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const mockStatus = mockStatuses[hash % mockStatuses.length];
        
        setTrackingStatuses(prev => ({ ...prev, [orderId]: mockStatus }));
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'products':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Product List</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PRODUCTS.map(p => (
                                <div key={p.id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                                    <span className="text-white">{p.name.split('–')[0]}</span>
                                    <span className={`font-semibold ${p.status === 'available' ? 'text-amber-400' : 'text-yellow-400'}`}>
                                        {p.status === 'available' ? 'Rs. ' + p.price : p.status.replace('-', ' ').toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Order History</h3>
                        {orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order.id} className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-white">{order.id}</p>
                                                <p className="text-sm text-gray-300">{order.date}</p>
                                                 <p className="text-sm text-gray-400 mt-2">Status: <span className="font-semibold text-yellow-400">{order.status}</span></p>
                                            </div>
                                            <div className="text-right">
                                                 <p className="text-lg font-semibold text-white">Rs. {order.totalAmount.toFixed(2)}</p>
                                                 <p className="text-sm text-gray-400">Advance: Rs. {order.advancePaid.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-gray-600 text-sm text-gray-300 space-y-1">
                                            <p><strong>To:</strong> {order.fullName}</p>
                                            <p><strong>Address:</strong> {order.address}, {order.city}</p>
                                            <p><strong>Contact:</strong> {order.phoneNumber}</p>
                                            <p><strong>Courier:</strong> {order.deliveryCompany}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">You have no past orders.</p>
                        )}
                    </div>
                );
            case 'status':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Order Status</h3>
                        {orders.filter(o => o.status !== 'Delivered').length > 0 ? (
                             <div className="space-y-4">
                                {orders.filter(o => o.status !== 'Delivered').map(order => (
                                    <div key={order.id} className="bg-gray-700 p-4 rounded-lg">
                                        <p className="font-bold text-white">{order.id}</p>
                                        <p className="text-sm text-gray-300">Current Status: {order.status}</p>
                                        <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                                            <div className="bg-gradient-to-r from-amber-500 to-purple-600 h-2.5 rounded-full" style={{ width: order.status === 'Processing' ? '33%' : order.status === 'Shipped' ? '66%' : '100%' }}></div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-600">
                                            <h4 className="text-md font-semibold text-white mb-2">Track Your Package</h4>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <input 
                                                    type="text" 
                                                    placeholder="Enter Tracking Number"
                                                    value={trackingNumbers[order.id] || ''}
                                                    onChange={(e) => handleTrackingNumberChange(order.id, e.target.value)}
                                                    className="flex-grow bg-gray-800 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition"
                                                />
                                                <button 
                                                    onClick={() => handleTrackOrder(order.id, order.deliveryCompany, order.city)}
                                                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg transition"
                                                >
                                                    Track
                                                </button>
                                            </div>
                                            {trackingStatuses[order.id] && (
                                                <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                                                    <p className="text-white text-sm">
                                                        <span className="font-bold">Status:</span> {trackingStatuses[order.id]}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-gray-400">No active orders found.</p>
                        )}
                    </div>
                );
            case 'payments':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Payment Details</h3>
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h4 className="font-bold text-white text-lg">Easypaisa Details</h4>
                            <p className="text-gray-300 mt-2">To complete any future payments, please use the following account:</p>
                            <p className="mt-2 text-white font-mono bg-gray-800 p-2 rounded-md">PK76TMFB0000000040888058</p>
                            <h4 className="font-bold text-white text-lg mt-6">Payment History</h4>
                             {orders.length > 0 ? (
                                <ul className="list-disc list-inside mt-2 text-gray-300">
                                    {orders.map(order => (
                                        <li key={order.id}>
                                            <span className="text-white font-semibold">Rs. {order.advancePaid.toFixed(2)}</span> advance paid for Order {order.id} on {order.date}
                                        </li>
                                    ))}
                                </ul>
                             ) : (
                                <p className="text-gray-400 mt-2">No payment history available.</p>
                             )}
                        </div>
                    </div>
                );
            case 'reviews':
                 return (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Reviews / Feedback</h3>
                        {submittedReview ? (
                            <div className="bg-purple-900/50 text-purple-300 p-4 rounded-lg">
                                <p>Thank you for your feedback!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReviewSubmit}>
                                <textarea
                                    value={review}
                                    onChange={e => setReview(e.target.value)}
                                    rows={5}
                                    placeholder="Share your experience..."
                                    className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition"
                                ></textarea>
                                <button type="submit" className="mt-4 bg-gradient-to-r from-amber-500 to-purple-600 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/40 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                                    Submit Review
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
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${activeTab === tabId ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-300 hover:bg-gray-700'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-4xl font-extrabold text-white">Welcome, {user.name}!</h2>
                    <p className="text-gray-400">Manage your orders and review your experience with us.</p>
                </div>
                 <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400">Account Balance</p>
                    <p className="text-2xl font-bold text-amber-400">Rs. {user.balance.toFixed(2)}</p>
                 </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-6">
                <div className="mb-6 border-b border-gray-700">
                    <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
                        <TabButton tabId="history" label="Order History" />
                        <TabButton tabId="status" label="Order Status" />
                        <TabButton tabId="products" label="Products List" />
                        <TabButton tabId="payments" label="Payment Details" />
                        <TabButton tabId="reviews" label="Reviews" />
                    </div>
                </div>
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
