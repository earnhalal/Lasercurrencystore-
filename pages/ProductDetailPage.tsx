import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '../constants';
import { useCart } from '../context/CartContext';
import type { Review } from '../types';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const ReviewsSection: React.FC<{ productId: number }> = ({ productId }) => {
    const productReviews = REVIEWS.filter(r => r.productId === productId);

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">User Reviews</h2>
            {productReviews.length > 0 ? (
                <div className="space-y-4">
                    {productReviews.map((review, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <p className="font-semibold text-amber-400 mr-4">{review.author}</p>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
                                </div>
                            </div>
                            <p className="text-gray-300">{review.text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No reviews for this product yet.</p>
            )}
        </div>
    );
};

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const productId = parseInt(id || '');
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl text-white">Product not found</h2>
                <Link to="/" className="text-amber-400 hover:text-amber-300 mt-4 inline-block">
                    &larr; Back to Shop
                </Link>
            </div>
        );
    }
    
    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    const isAvailable = product.status === 'available';
    const statusText = product.status === 'stock-end' ? 'Out of Stock' : 'Coming Soon';
    const statusTextColor = product.status === 'stock-end' ? 'text-red-400' : 'text-blue-400';
    const statusBgColor = product.status === 'stock-end' ? 'bg-red-900/50 border-red-500/50' : 'bg-blue-900/50 border-blue-500/50';
    const statusBadgeColor = product.status === 'stock-end' ? 'bg-red-900/60' : 'bg-blue-900/60';
    const statusOverlayColor = product.status === 'stock-end' ? 'bg-red-600/80' : 'bg-blue-600/80';

    const nameParts = product.name.split('–').map(p => p.trim());
    const coreName = nameParts[0];
    const details = nameParts.length > 2 ? nameParts[1] : null;
    const priceText = nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden md:flex">
                <div className="md:w-1/2 relative">
                    <img className={`w-full h-64 md:h-full object-cover ${!isAvailable && 'opacity-50'}`} src={product.imageUrl} alt={product.name} />
                     {!isAvailable && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                            <span className={`px-6 py-3 rounded-lg text-white font-bold text-2xl ${statusOverlayColor}`}>
                                {statusText}
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-white mb-2">{coreName}</h1>
                    
                    {!isAvailable && (
                         <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full my-4 w-fit ${statusTextColor} ${statusBadgeColor}`}>
                            {statusText}
                        </span>
                    )}

                    {details && (
                        <div className="my-4">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Quantity / Unit Price</p>
                            <p className="text-amber-300 text-lg mt-1">{details}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Description</p>
                        <p className="text-gray-300 text-lg mt-1">{product.description}</p>
                    </div>
                    
                    {isAvailable && priceText ? (
                         <div className="mb-8">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Price</p>
                            <p className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-amber-400 mt-1">
                                {priceText.replace('Total', '').trim()}
                            </p>
                        </div>
                    ) : (
                        <div className={`p-4 rounded-lg mb-8 text-center border ${statusBgColor}`}>
                             <p className={`text-2xl font-bold ${statusTextColor}`}>{statusText}</p>
                             <p className="text-gray-300 mt-1">This product is currently unavailable.</p>
                        </div>
                    )}
                    
                    {isAvailable ? (
                        <div className="flex space-x-4">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/40 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-lg">
                                Add to Cart
                            </button>
                             <Link to="/" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg">
                                Back to Shop
                            </Link>
                        </div>
                    ) : (
                         <Link to="/" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg">
                                &larr; Back to Shop
                        </Link>
                    )}
                </div>
            </div>
             <ReviewsSection productId={productId} />
        </div>
    );
};
