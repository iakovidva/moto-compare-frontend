"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FeedbackForm from './FeedbackForm';
import SuggestNewMotorcycleForm from '@/components/home-page/SuggestNewMotorcycleForm';

export default function SubmitRequestPage() {
    const [activeTab, setActiveTab] = useState<'motorcycle' | 'feedback'>('motorcycle');

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4 text-foreground">
                            Submit a Request
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Request a motorcycle or share your feedback to help us improve!
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex mb-6 bg-muted rounded-lg p-1">
                        <Button
                            onClick={() => setActiveTab('motorcycle')}
                            className={`flex-1 ${activeTab === 'motorcycle'
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'bg-transparent text-muted-foreground hover:bg-accent'
                                }`}
                        >
                            Request Motorcycle
                        </Button>
                        <Button
                            onClick={() => setActiveTab('feedback')}
                            className={`flex-1 ${activeTab === 'feedback'
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'bg-transparent text-muted-foreground hover:bg-accent'
                                }`}
                        >
                            General Feedback
                        </Button>
                    </div>

                    <div className='bg-muted rounded-lg border text-card-foreground shadow-sm p-4'>
                        <h3 className="text-2xl font-semibold text-center pb-4">
                            {activeTab === 'motorcycle' ? 'Request a Motorcycle' : 'Share Your Feedback'}
                        </h3>
                        {activeTab === 'motorcycle' ? <SuggestNewMotorcycleForm /> : <FeedbackForm />}

                    </div>
                </div>
            </div>
        </div>
    );
};
