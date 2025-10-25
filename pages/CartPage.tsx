import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { DELIVERY_COMPANIES } from '../constants';
import type { Order } from '../types';

const OrderModal: React.FC<{onClose: () => void; onConfirm: () => void; advanceAmount: number}> = ({onClose, onConfirm, advanceAmount}) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Confirm Your Order</h2>
            <p className="text-gray-300 mb-4">50% advance payment required. Remaining 50% on delivery. Your order will arrive in 24–48 hours.</p>
            <div className="bg-gray-900 p-4 rounded-lg">
                 <p className="text-gray-400">Pay 50% advance to:</p>
                 <p className="text-white font-mono mt-1">Easypaisa IBAN: PK76TMFB0000000040888058</p>
                 <p className="text-2xl font-bold text-amber-400 mt-2">Advance: Rs. {advanceAmount.toFixed(2)}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                <button onClick={onConfirm} className="bg-gradient-to-r from-amber-500 to-purple-600 hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition">Confirm & Place Order</button>
            </div>
        </div>
    </div>
);


export const CartPage: React.FC = () => {
    const { cart, removeFromCart, totalAmount, clearCart } = useCart();
    const { user, addOrder } = useAuth();
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const [deliveryCompany, setDeliveryCompany] = useState(DELIVERY_COMPANIES[0]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const advanceAmount = totalAmount / 2;
    const isFormValid = fullName.trim() !== '' && phoneNumber.trim() !== '' && address.trim() !== '' && city.trim() !== '';

    const handlePlaceOrder = () => {
        if (!user || user.status !== 'verified') {
            navigate('/auth');
            return;
        }
        if (cart.length === 0 || !isFormValid) return;
        setIsModalOpen(true);
    };

    const handleConfirmOrder = () => {
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            items: cart,
            totalAmount,
            advancePaid: advanceAmount,
            date: new Date().toLocaleDateString(),
            status: 'Processing',
            city,
            deliveryCompany,
            fullName,
            phoneNumber,
            address,
        };
        addOrder(newOrder);
        clearCart();
        setOrderPlaced(true);
        setIsModalOpen(false);
    };

    if (orderPlaced) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-white bg-gray-800/50 rounded-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-3xl font-bold mb-4">Thank you! Your order has been received.</h2>
                <p className="text-gray-300 mb-6">You will get your package within 24 hours to 2 days.</p>
                <div className="bg-yellow-900/30 border border-yellow-500/50 text-yellow-300 rounded-lg p-3 my-4 max-w-md mx-auto">
                    <p>Apka order process me hai. Advance receive hone ke baad dispatch kiya jaye ga.</p>
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                    <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition">
                        Continue Shopping
                    </Link>
                    <Link to="/dashboard" className="bg-gradient-to-r from-amber-500 to-purple-600 hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }
    
    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="bg-gradient-to-r from-amber-500 to-purple-600 hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition">
                    &larr; Continue Shopping
                </Link>
            </div>
        );
    }

    const CheckoutSummary = () => (
        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 lg:sticky lg:top-28">
            <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-3 mb-4">Checkout Summary</h3>
            <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">Rs. {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Advance Payment (50%)</span>
                    <span className="font-semibold text-white">Rs. {advanceAmount.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-lg pt-2 border-t border-gray-600 mt-2">
                    <span className="font-bold text-white">Total Amount</span>
                    <span className="font-bold text-amber-400">Rs. {totalAmount.toFixed(2)}</span>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Remaining balance is due upon delivery.</p>
             <button
                onClick={handlePlaceOrder}
                disabled={!isFormValid || cart.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/40 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
                Place Order
            </button>
             {!user || user.status !== 'verified' ? (
                <p className="text-center text-yellow-400 text-sm mt-3 bg-yellow-900/40 p-2 rounded-md">Please <Link to="/auth" className="font-bold underline">Signup</Link> to place an order.</p>
            ) : !isFormValid ? (
                 <p className="text-center text-red-400 text-sm mt-3">Please fill in all delivery details.</p>
            ) : null}
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
             {isModalOpen && <OrderModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmOrder} advanceAmount={advanceAmount} />}
            <h2 className="text-4xl font-extrabold text-white mb-8 text-center lg:text-left">Your Shopping Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">

                {/* Left Column: Cart Items & Form */}
                <div className="lg:col-span-2">
                    {/* Cart Items */}
                    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 mb-8">
                         <h3 className="text-2xl font-bold text-white mb-4">Order Items</h3>
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0">
                                <div className="flex items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                    <div>
                                        <p className="font-bold text-white">{item.name.split('–')[0]}</p>
                                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-white">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 text-sm mt-1">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                     {/* Checkout Form */}
                    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Delivery Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                                <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition" />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Address</label>
                                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                                <input type="text" value={city} onChange={e => setCity(e.target.value)} required placeholder="e.g., Karachi" className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Delivery Company</label>
                                <select value={deliveryCompany} onChange={e => setDeliveryCompany(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500 transition">
                                    {DELIVERY_COMPANIES.map(company => <option key={company} value={company}>{company}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Checkout Summary */}
                <div className="lg:col-span-1 mt-8 lg:mt-0">
                    <CheckoutSummary />
                </div>

            </div>
        </div>
    );
};