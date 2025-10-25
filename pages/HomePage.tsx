import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import type { Product, ProductStatus } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    const isAvailable = product.status === 'available';
    const statusText = product.status === 'stock-end' ? 'Out of Stock' : 'Coming Soon';
    const statusBgColor = product.status === 'stock-end' ? 'bg-red-600/80' : 'bg-blue-600/80';
    const buttonStatusClasses = product.status === 'stock-end' 
        ? 'bg-red-900/50 text-red-400' 
        : 'bg-blue-900/50 text-blue-400';

    const nameParts = product.name.split('–').map(p => p.trim());
    const coreName = nameParts[0];
    const details = nameParts.length > 2 ? nameParts[1] : null;
    const priceText = nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;

    return (
        <div className={`bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 flex flex-col ${!isAvailable ? 'opacity-70' : ''}`}>
            <div className="relative">
                <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
                {!isAvailable && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                        <span className={`px-4 py-2 rounded-md text-white font-bold text-lg ${statusBgColor}`}>
                            {statusText}
                        </span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-4 min-h-[3rem]">{coreName}</h3>
                
                <div className="flex-grow space-y-4 mb-4">
                    {details && (
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quantity / Unit Price</p>
                            <p className="text-base text-white">{details}</p>
                        </div>
                    )}
                    
                    {isAvailable && priceText ? (
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Price</p>
                            <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-amber-400">
                                {priceText.replace('Total', '').trim()}
                            </p>
                        </div>
                    ) : (
                        <div className="flex-grow"></div> 
                    )}
                </div>

                <div className="mt-auto">
                    {isAvailable ? (
                        <div className="flex space-x-2">
                            <Link to={`/product/${product.id}`} className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                View Details
                            </Link>
                            <button 
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/40 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                                Add to Cart
                            </button>
                        </div>
                    ) : (
                        <div className={`text-center font-bold py-2 px-4 rounded-lg ${buttonStatusClasses}`}>
                           {statusText}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InstructionsBox: React.FC = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-gray-800/50 border border-purple-500/30 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Important Information</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>A 50% advance payment is required for every order.</li>
                <li>Delivery is available to all cities in Pakistan.</li>
                <li>Delivery time is typically 24–48 hours after advance payment confirmation.</li>
                <li>One account is allowed per device. Multiple signups are not permitted.</li>
                <li>This app is for trading and resale purposes only. Any fraudulent activity is prohibited.</li>
                <li>Only real users should sign up; fake accounts will not be verified.</li>
            </ul>
        </div>
    </div>
);


export const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<ProductStatus | 'all'>('all');

    const filteredProducts = useMemo(() => {
        return PRODUCTS
            .filter(product => {
                if (filterStatus === 'all') return true;
                return product.status === filterStatus;
            })
            .filter(product => {
                const term = searchTerm.toLowerCase();
                return (
                    product.name.toLowerCase().includes(term) ||
                    product.description.toLowerCase().includes(term)
                );
            });
    }, [searchTerm, filterStatus]);

    const FilterButton: React.FC<{ status: ProductStatus | 'all', label: string }> = ({ status, label }) => (
        <button
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${filterStatus === status ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-extrabold text-center text-white mb-8">Our Products</h2>

            {/* Search and Filter Controls */}
            <div className="mb-8 p-4 bg-gray-800/50 rounded-lg flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-700 border-gray-600 rounded-md p-3 text-white focus:ring-amber-500 focus:border-amber-500 transition pl-10"
                    />
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div className="flex space-x-2">
                    <FilterButton status="all" label="All" />
                    <FilterButton status="available" label="Available" />
                    <FilterButton status="stock-end" label="Out of Stock" />
                    <FilterButton status="coming-soon" label="Coming Soon" />
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16">
                    <h3 className="text-2xl text-white font-bold">No Products Found</h3>
                    <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
                </div>
            )}
            <InstructionsBox />
        </div>
    );
};
