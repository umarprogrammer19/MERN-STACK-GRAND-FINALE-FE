import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

interface UserDetailsPopupProps {
    onClose: () => void;
}

const UserDetailsPopup: React.FC<UserDetailsPopupProps> = ({ onClose }) => {
    const [cnic, setCnic] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // To handle loading state
    const router = useRouter(); // React Router hook for navigation

    const handleSave = async () => {
        if (!cnic || !email || !name) {
            alert('Please fill all fields.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cnic, email, name }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('User registered successfully!');
                onClose();
                router.push('/login');
            } else {
                alert(result.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
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
                    <Button className="bg-gray-500 text-white" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-blue-600 text-white"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPopup;
