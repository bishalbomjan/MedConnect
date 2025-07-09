'use client';
import apiClient from '@/app/api-client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const PatientApproval = () => {

    const [pending, setPending] = useState([]);

    const fetchPendingPatient = async () => {
        try {
            const response = await apiClient.get("/patientKyc?status=pending");
            setPending(response.data);
        } catch (error) {
            toast.error("Failed to fetch pending patients.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPendingPatient();
    }, []);

    const handleApproval = async (patientId) => {
        try {
            const patient = await apiClient.patch(`/patientKyc/${patientId}`);
            toast(patient.data.message);
            fetchPendingPatient(); // Refresh the list after approval
        } catch (error) {
            toast.error("Failed to approve patient.");
            console.error(error);
        }
    };

    return (
        <>
            {pending.length === 0 ? (
                <p>No pending approvals</p>
            ) : (
                <ul>
                    {pending.map(item => (
                        <li key={item._id}>
                            {item.fullname}
                            <Button onClick={() => handleApproval(item.patient._id)}>
                                Approve
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default PatientApproval;
