"use client";
import UpdatePasswordPopup from '@/components/updatePassword';
import React, { useState, useEffect } from 'react';

function LoanDetails() {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    // Automatically open the popup when the page loads
    useEffect(() => {
        setIsPopupOpen(true);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Loan Details Page</h1>
            {isPopupOpen && <UpdatePasswordPopup onClose={() => setIsPopupOpen(false)} />}
        </div>
    );
}

export default LoanDetails;
