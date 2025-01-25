import React, { useState } from 'react';

interface UpdatePasswordPopupProps {
    onClose: () => void;
}

const UpdatePasswordPopup: React.FC<UpdatePasswordPopupProps> = ({ onClose }) => {
    const [newPassword, setNewPassword] = useState<string>('');

    const handleUpdate = async () => {
        if (!newPassword) {
            alert('Please enter a new password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,  // Assuming you use token-based authentication
                },
                body: JSON.stringify({
                    password: newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Password updated successfully!');
                onClose(); // Close the popup after successful update
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred while updating the password.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold text-center mb-4">Update Password</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 text-sm text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePasswordPopup;
