'use client';
import apiClient from '@/app/api-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PatientHome = () => {
    const { _id } = useSelector((state: any) => state.user);
    const [patient, setPatient] = useState([]);
    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const response = await apiClient.get(`/patinetKyc/${_id}`);
            console.log("Fetched patinet data:", response.data);
            setPatient(response.data);
        } catch (err) {
            console.error("Failed to fetch patient:", err);
        }
    };

    return (
        <>
            {!patient.isKycSubmitted && <div>

                <Button asChild>
                    <Link href="/patientKYC">Enter your KYC Details</Link>
                </Button>
            </div>
            }
        </>

    );
};

export default PatientHome;
