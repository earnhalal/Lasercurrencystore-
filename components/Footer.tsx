import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black/50 text-white mt-12">
            <div className="container mx-auto py-6 px-4 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Laser Currency Store. All rights reserved.</p>
                 <Link to="/privacy" className="text-sm text-gray-500 hover:text-amber-400 transition-colors mt-2 inline-block">
                    Privacy Policy & Terms
                </Link>
            </div>
        </footer>
    );
};
