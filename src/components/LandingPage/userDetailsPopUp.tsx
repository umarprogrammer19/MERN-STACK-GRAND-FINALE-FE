import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLoanCalculator } from '@/context/loanContext';

interface UserDetailsPopupProps {
    onClose: () => void;
}

const UserDetailsPopup: React.FC<UserDetailsPopupProps> = ({ onClose }) => {
    const { loanDetails, setLoanDetails } = useLoanCalculator();
    const [cnic, setCnic] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSave = () => {
        if (!cnic || !email || !name) {
            alert('Please fill all fields.');
            return;
        }

        // Merge user details with loan details in context
        // setLoanDetails({
        //     ...loanDetails,
        //     cnic,
        //     email,
        //     name,
        // });

        alert('User details saved successfully!');
        onClose(); // Close the popup
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-center mb-4">Enter Your Details</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">CNIC</label>
                    <Input
                        type="text"
                        placeholder="Enter your CNIC"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">Name</label>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button className="bg-gray-500 text-white" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-600 text-white" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPopup;
