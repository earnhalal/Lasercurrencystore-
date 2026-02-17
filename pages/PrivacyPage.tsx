
import React from 'react';

export const PrivacyPage: React.FC = () => {
    const sections = [
        {
            title: "Data Confidentiality",
            points: [
                "We implement banking-grade security protocols. Your personal information (Identity, Transactions) is encrypted and isolated.",
                "Laser Currency Store strictly adheres to a non-disclosure policy. Your trading data is never shared with third-party entities."
            ]
        },
        {
            title: "Terms of Engagement",
            points: [
                "The platform is designated for collectors and authorized prop usage only. Any intent to use replicas for fraud will result in immediate termination.",
                "Users are restricted to one account per device to maintain ecosystem integrity."
            ]
        },
        {
            title: "Financial Verification",
            points: [
                "All deposits undergo a manual audit. Please retain your transaction receipts until the manifest is cleared for dispatch.",
                "Orders exceeding 100 units may require additional KYC verification."
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900"></div>
                
                <h1 className="text-4xl font-black text-center text-slate-900 mb-12 uppercase tracking-tight">
                    Legal & Privacy Framework
                </h1>
                
                <div className="space-y-12">
                    {sections.map(section => (
                        <div key={section.title} className="relative pl-8 border-l-4 border-amber-400">
                            <h2 className="text-2xl font-black text-blue-900 mb-4 uppercase tracking-tight">{section.title}</h2>
                            <ul className="space-y-4 text-slate-600">
                                {section.points.map((point, index) => (
                                    <li key={index} className="leading-relaxed font-medium">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                 <div className="mt-16 text-center pt-8 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        By accessing the Laser Currency Store, you acknowledge and consent to these protocols.
                    </p>
                </div>
            </div>
        </div>
    );
};
