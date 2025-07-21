'use client';
import apiClient from '@/app/api-client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const DoctorApproval = () => {
    const [pending, setPending] = useState([]);

    const fetchPendingDoctor = async () => {
        try {
            const response = await apiClient.get("/doctorkycs?status=pending");
            setPending(response.data);
            debugger
        } catch (error) {
            toast.error("Failed to fetch pending doctors.");
            console.error(error);
        }
    };

    useEffect(() => {
        debugger
        fetchPendingDoctor();
    }, []);

    const handleApproval = async (kycId) => {
        try {
            const doc = await apiClient.patch(`/doctorkycs/${kycId}`);
            toast.success(doc.data.message);
            fetchPendingDoctor(); // Refresh list
        } catch (error) {
            toast.error("Failed to approve doctor.");
            console.error(error);
        }
    };
    console.log(pending)
    return (
        <>
            {pending.length === 0 ? (
                <p>No doctors pending approval.</p>
            ) : (
                <ul className="space-y-2">
                    {pending.map((item) => (
                        <li
                            key={item._id}
                            className="flex items-center justify-between border p-2 rounded"
                        >
                            <span>{item.fullname}</span>
                            <Button onClick={() => handleApproval(item._id)}>
                                Approve
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default DoctorApproval;
