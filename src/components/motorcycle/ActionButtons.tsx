"use client"

import React, { useState } from "react";
import ReportIncorrectSpec from "./ReportIncorrectSpec";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import AuthModal from "../main-header/AuthModal";
import { Toaster } from 'react-hot-toast';
import FavoriteToggleButton from "./FavoriteToggleButton";

type Props = {
    bike: MotorcycleDetailsModel;
};

const ActionButtons = ({ bike }: Props) => {

    const [authModalOpen, setAuthModalOpen] = useState(false);

    return (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                <FavoriteToggleButton bike={bike} onRequireAuth={() => setAuthModalOpen(true)} />

                <ReportIncorrectSpec bike={bike} />

                {authModalOpen && (
                    <AuthModal
                        isOpen={authModalOpen}
                        onClose={() => setAuthModalOpen(false)}
                        message="❤️ Please log in or create an account to save bikes to your favorites!"
                    />
                )}
                <Toaster position="bottom-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default ActionButtons;