"use client";
import React, { useState, useEffect } from 'react';

const LoanRequestPage: React.FC = () => {
    const [loanDetails, setLoanDetails] = useState<any>(null);
    const [guarantors, setGuarantors] = useState<any[]>([
        { name: '', email: '', location: '', cnic: '' },
        { name: '', email: '', location: '', cnic: '' },
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const storedDetails = localStorage.getItem('loanDetail');
        if (storedDetails) {
            setLoanDetails(JSON.parse(storedDetails));
        } else {
            alert('No loan details found! Please use the calculator first.');
        }
    }, []);

    const handleGuarantorChange = (index: number, field: string, value: string) => {
        const updatedGuarantors = [...guarantors];
        updatedGuarantors[index][field] = value;
        setGuarantors(updatedGuarantors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loanDetails || guarantors.some(g => !g.name || !g.email || !g.location || !g.cnic)) {
            alert('All fields are required, and at least 2 guarantors must be provided.');
            return;
        }

        const requestData = {
            ...loanDetails,
            guarantors,
        };

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8000/api/v2/getUserLoanRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Loan request submitted successfully!');
                console.log('Response:', result);
            } else {
                console.error('Error:', result.message);
                alert(result.message || 'Failed to submit loan request.');
            }
        } catch (error) {
            console.error('Error submitting loan request:', error);
            alert('An error occurred while submitting the loan request.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!loanDetails) {
        return (
            <div className="py-16 px-6 bg-gray-50 rounded-t-3xl text-center">
                <h2 className="text-3xl font-bold text-gray-900">No Loan Details Found</h2>
                <p className="text-gray-700 mt-4">Please use the loan calculator first to save loan details.</p>
            </div>
        );
    }

    return (
        <section className="py-16 px-6 bg-gray-50 rounded-t-3xl">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Submit Loan Request</h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                    <div className="col-span-2">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Loan Details</h3>
                        <p><strong>Category:</strong> {loanDetails.category}</p>
                        <p><strong>Subcategory:</strong> {loanDetails.subcategory}</p>
                        <p><strong>Loan Amount:</strong> PKR {loanDetails.amount}</p>
                        <p><strong>Loan Period:</strong> {loanDetails.loanPeriod} years</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Guarantor Details</h3>
                        {guarantors.map((guarantor, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder={`Guarantor ${index + 1} Name`}
                                    value={guarantor.name}
                                    onChange={(e) => handleGuarantorChange(index, 'name', e.target.value)}
                                    className="bg-white border-gray-300 text-gray-800 placeholder-gray-400 p-2 rounded"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={guarantor.email}
                                    onChange={(e) => handleGuarantorChange(index, 'email', e.target.value)}
                                    className="bg-white border-gray-300 text-gray-800 placeholder-gray-400 p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={guarantor.location}
                                    onChange={(e) => handleGuarantorChange(index, 'location', e.target.value)}
                                    className="bg-white border-gray-300 text-gray-800 placeholder-gray-400 p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="CNIC"
                                    value={guarantor.cnic}
                                    onChange={(e) => handleGuarantorChange(index, 'cnic', e.target.value)}
                                    className="bg-white border-gray-300 text-gray-800 placeholder-gray-400 p-2 rounded"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`col-span-2 bg-blue-600 px-8 py-4 font-semibold text-lg rounded-full hover:bg-blue-700 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default LoanRequestPage;
