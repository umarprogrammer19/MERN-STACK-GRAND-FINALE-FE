"use client";
import React, { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('https://finance-management-19.koyeb.app/api/admin/getApp', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add token if required
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch applications.');
                }

                const data = await response.json();
                setApplications(data.applications || []);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (isLoading) {
        return <div className="text-center py-20">Loading applications...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <section className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
            {applications.length === 0 ? (
                <div className="text-center py-10">No applications found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-200 shadow-lg bg-white">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 border">Application ID</th>
                                <th className="px-4 py-2 border">User Info</th>
                                <th className="px-4 py-2 border">Loan Details</th>
                                <th className="px-4 py-2 border">Guarantors</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app: any) => (
                                <tr key={app._id} className="text-sm text-gray-700">
                                    {/* Application ID */}
                                    <td className="px-4 py-2 border">{app._id}</td>

                                    {/* User Info */}
                                    <td className="px-4 py-2 border">
                                        <div><strong>Name:</strong> {app.userId.name}</div>
                                        <div><strong>Email:</strong> {app.userId.email}</div>
                                        <div><strong>CNIC:</strong> {app.userId.cnic}</div>
                                    </td>

                                    {/* Loan Details */}
                                    <td className="px-4 py-2 border">
                                        <div><strong>Category:</strong> {app.category}</div>
                                        <div><strong>Subcategory:</strong> {app.subcategory}</div>
                                        <div><strong>Amount:</strong> PKR {app.amount}</div>
                                        <div><strong>Period:</strong> {app.loanPeriod} year(s)</div>
                                    </td>

                                    {/* Guarantors */}
                                    <td className="px-4 py-2 border">
                                        {app.guarantors.map((g: any, index: number) => (
                                            <div key={index} className="mb-2">
                                                <div><strong>Name:</strong> {g.name}</div>
                                                <div><strong>Email:</strong> {g.email}</div>
                                                <div><strong>Location:</strong> {g.location}</div>
                                                <div><strong>CNIC:</strong> {g.cnic}</div>
                                            </div>
                                        ))}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-2 border text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${app.status === 'Pending'
                                                    ? 'bg-yellow-500'
                                                    : app.status === 'Approved'
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                }`}
                                        >
                                            {app.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded mb-2 block"
                                            onClick={() => handleStatusUpdate(app._id, 'Approved')}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                            onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );

    async function handleStatusUpdate(applicationId: string, status: string) {
        try {
            const response = await fetch(`https://finance-management-19.koyeb.app/api/admin/updateApp/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update application status.');
            }

            const updatedApp = await response.json();
            alert(`Application status updated to ${status}.`);

            // Update state with new status
            setApplications((prev) =>
                prev.map((app) => (app._id === applicationId ? { ...app, status } : app))
            );
        } catch (error) {
            alert('Failed to update status. Please try again.');
        }
    }
};

export default AdminDashboard;
