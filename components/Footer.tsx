import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-slate-100 mt-32">
            <div className="container mx-auto py-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="md:col-span-2">
                         <Link to="/" className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-blue-900 flex items-center justify-center rounded-xl">
                                <span className="text-white font-black text-lg">LC</span>
                            </div>
                            <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tighter leading-none">LASER <br/><span className="text-amber-500 text-lg">CURRENCY</span></h3>
                        </Link>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm mb-10">
                            Pakistan's specialized vault for cinematic replicas. Adhering to the highest standards of micro-printing simulation and discreet distribution.
                        </p>
                        <div className="flex gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 hover:text-blue-900 hover:bg-white transition-all cursor-pointer">
                                    <div className="w-3 h-3 bg-current rounded-sm"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.3em]">Protocols</h4>
                        <ul className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <li><a href="#" className="hover:text-blue-900 transition">Logistics Flow</a></li>
                            <li><a href="#" className="hover:text-blue-900 transition">Settlement Guide</a></li>
                            <li><a href="#" className="hover:text-blue-900 transition">Bulk Requisitions</a></li>
                            <li><a href="#" className="hover:text-blue-900 transition">Identity Audit</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.3em]">Compliance</h4>
                         <Link to="/privacy" className="text-xs font-bold text-slate-400 hover:text-blue-900 transition block uppercase tracking-widest mb-4">
                            Privacy Framework
                        </Link>
                         <p className="text-xs font-black text-slate-300 uppercase tracking-widest mt-12">&copy; {new Date().getFullYear()} LC STORES PVT LTD.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};