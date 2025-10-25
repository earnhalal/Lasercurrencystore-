import React from 'react';

export const PrivacyPage: React.FC = () => {
    const sections = [
        {
            title: "Data Privacy",
            points: [
                "Your personal information (Name, Email, Orders) is stored securely and used only to manage your orders.",
                "Laser Currency Store does not share or sell your data to any third party."
            ]
        },
        {
            title: "Terms of Service",
            points: [
                "Users must not use this app for illegal trading, scamming, or fake transactions.",
                "Any misuse will lead to permanent account suspension."
            ]
        },
        {
            title: "Payment and Verification",
            points: [
                "All payments are verified manually. Please keep your transaction proof safe until delivery."
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-lg shadow-lg p-8 border border-purple-500/30">
                <h1 className="text-4xl font-extrabold text-center text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500">
                    Privacy Policy & Terms
                </h1>
                
                <div className="space-y-8">
                    {sections.map(section => (
                        <div key={section.title}>
                            <h2 className="text-2xl font-bold text-amber-400 mb-4">{section.title}</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                {section.points.map((point, index) => <li key={index}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                
                 <div className="mt-10 text-center text-sm text-gray-400">
                    <p>By using the Laser Currency Store, you agree to these terms.</p>
                </div>
            </div>
        </div>
    );
};