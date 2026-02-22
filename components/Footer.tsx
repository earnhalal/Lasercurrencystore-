import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
    Shield, 
    Truck, 
    CreditCard, 
    UserCheck, 
    Facebook, 
    Twitter, 
    Instagram, 
    Mail, 
    Phone, 
    MapPin,
    ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Navigation",
            links: [
                { name: "Inventory", path: "/" },
                { name: "New Arrivals", path: "/" },
                { name: "Best Sellers", path: "/" },
                { name: "Bulk Orders", path: "/" },
            ]
        },
        {
            title: "Client Vault",
            links: [
                { name: "Dashboard", path: "/dashboard" },
                { name: "Order History", path: "/dashboard" },
                { name: "Vault Balance", path: "/dashboard" },
                { name: "Identity Access", path: "/auth" },
            ]
        },
        {
            title: "Compliance",
            links: [
                { name: "Privacy Framework", path: "/privacy" },
                { name: "Terms of Service", path: "/privacy" },
                { name: "Settlement Guide", path: "/privacy" },
                { name: "Identity Audit", path: "/privacy" },
            ]
        }
    ];

    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/20 via-amber-500/20 to-blue-600/20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Top Section: Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-b border-white/5 pb-16">
                    {[
                        { icon: Shield, title: "Secure Vault", desc: "End-to-end encryption" },
                        { icon: Truck, title: "Discreet Flow", desc: "Regional transit nodes" },
                        { icon: CreditCard, title: "Fast Settlement", desc: "Instant verification" },
                        { icon: UserCheck, title: "Verified Access", desc: "Identity audit required" }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10 group-hover:border-amber-500/30 transition-all">
                                <feature.icon className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            </div>
                            <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{feature.title}</h5>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="flex items-center gap-4 mb-8 group">
                            <div className="w-12 h-12 bg-blue-600/20 flex items-center justify-center rounded-2xl border border-blue-500/30 group-hover:scale-110 transition-transform">
                                <span className="text-blue-400 font-black text-xl">LC</span>
                            </div>
                            <h3 className="font-black text-2xl text-white uppercase tracking-tighter leading-none">
                                LASER <br/>
                                <span className="text-amber-500 text-lg">CURRENCY</span>
                            </h3>
                        </Link>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-sm mb-10 uppercase tracking-wider">
                            Pakistan's specialized vault for cinematic replicas. Adhering to the highest standards of micro-printing simulation and discreet distribution protocols.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, label: "Facebook" },
                                { icon: Twitter, label: "Twitter" },
                                { icon: Instagram, label: "Instagram" },
                                { icon: Mail, label: "Email" }
                            ].map((social, i) => (
                                <motion.a 
                                    key={i}
                                    whileHover={{ y: -4 }}
                                    href="#" 
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
                        {footerSections.map((section, idx) => (
                            <div key={idx}>
                                <h4 className="font-black text-white mb-8 uppercase text-[10px] tracking-[0.3em]">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link 
                                                to={link.path} 
                                                className="text-[10px] font-black text-slate-500 hover:text-amber-500 transition-colors uppercase tracking-widest flex items-center gap-2 group"
                                            >
                                                <div className="w-1 h-1 bg-slate-800 rounded-full group-hover:bg-amber-500 transition-colors"></div>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact/Newsletter Section */}
                    <div className="lg:col-span-3">
                        <h4 className="font-black text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Operational HQ</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                                    <MapPin className="w-4 h-4 text-slate-500" />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                                    Sector G-11, Islamabad,<br/>Capital Territory, Pakistan
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                                    <Phone className="w-4 h-4 text-slate-500" />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    +92 300 0000000
                                </p>
                            </div>
                            <div className="pt-6">
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        placeholder="SECURE EMAIL" 
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-5 text-[10px] font-black text-white placeholder:text-slate-700 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                                    />
                                    <button className="absolute right-2 top-2 bottom-2 bg-white text-slate-950 px-4 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 transition-colors">
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
                            &copy; {currentYear} LC STORES PVT LTD. ALL RIGHTS RESERVED.
                        </p>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
                                ENCRYPTED CONNECTION: AES-256
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <Link to="/privacy" className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition">Status</Link>
                        <Link to="/privacy" className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition">Support</Link>
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Systems Nominal</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
