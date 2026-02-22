import React from 'react';

export const PrivacyPage: React.FC = () => {
    const sections = [
        {
            title: "Data Confidentiality Protocol",
            points: [
                "We implement AES-256 grade encryption for all transaction manifest data. Your celebration details are stored in isolated silos.",
                "LASER STORE strictly adheres to a Zero-Leak policy. No client identity data is shared with third-party logistics providers beyond basic routing info.",
                "Order history is automatically archived into a secure vault after 30 days of delivery confirmation."
            ]
        },
        {
            title: "Authorized Usage Policy",
            points: [
                "The currency replicas provided by this repository are designated solely for cinematic, educational, and theatrical purposes (Weddings, Music Videos).",
                "Any attempt to utilize these high-fidelity replicas for fraudulent activity or illicit trade will result in immediate account termination and reporting to regional authorities.",
                "Replicas are designed to adhere to 'Motion Picture' legal standards with specific markings differentiating them from authentic legal tender."
            ]
        },
        {
            title: "Logistics & Settlement Policy",
            points: [
                "Initial order activation requires a 50% advance settlement via verified bank channels (Easypaisa/JazzCash).",
                "Once the dispatch manifest is generated, the settlement is non-refundable. Please verify your bundle selections before final confirmation.",
                "Transit times via Local Bus services are typically 12-24 hours. Pakistan Post shipments follow standard government timelines (3-5 business days)."
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-white/5 p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600"></div>
                    
                    <div className="text-center mb-16">
                        <span className="text-blue-400 text-xs font-black uppercase tracking-[0.4em] mb-4 block">Legal Department</span>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                            Compliance Framework
                        </h1>
                    </div>
                    
                    <div className="space-y-16">
                        {sections.map(section => (
                            <div key={section.title} className="relative pl-10">
                                <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-600 rounded-full"></div>
                                <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{section.title}</h2>
                                <ul className="space-y-6 text-slate-400 font-medium">
                                    {section.points.map((point, index) => (
                                        <li key={index} className="leading-relaxed relative">
                                            <span className="absolute -left-6 text-amber-500 font-black">›</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section to fill space */}
                    <div className="mt-24 pt-16 border-t border-white/5">
                        <h3 className="text-xl font-black text-white mb-10 uppercase tracking-widest text-center underline decoration-amber-500 underline-offset-8">Quick Protocols (FAQ)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
                                <p className="font-bold text-blue-400 text-sm mb-2 uppercase">Can I pay full on delivery?</p>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">No. To ensure collector commitment and logistics security, a 50% advance is mandatory for all first-time and bulk orders.</p>
                            </div>
                            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
                                <p className="font-bold text-blue-400 text-sm mb-2 uppercase">Is it legal to carry these?</p>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">Yes, as theatrical props. However, we advise carrying them in our provided secure packaging to avoid public confusion.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-20 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                            Last Updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};