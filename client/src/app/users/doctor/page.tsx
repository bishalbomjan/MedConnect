'use client';
import apiClient from '@/app/api-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DoctorHome = () => {
    const { _id } = useSelector((state: any) => state.user);
    const [doctor, setDoctor] = useState([]);
    useEffect(() => {
        fetchDoctor();
    }, []);

    const fetchDoctor = async () => {
        try {
            const response = await apiClient.get(`/doctorkycs/${_id}`);
            console.log("Fetched doctor data:", response.data);
            setDoctor(response.data);
        } catch (err) {
            console.error("Failed to fetch doctor:", err);
        }
    };

    return (
        <>
            {!doctor.isKycSubmitted && (
                <Button asChild>
                    <Link href="/doctorKYC">Enter your KYC Details</Link>
                </Button>
            )}
            {_id}
            <div>Email: {doctor.fullname}</div>
            <pre>{JSON.stringify(doctor, null, 2)}</pre>
            <div>DoctorHome</div>
        </>

    );
};

export default DoctorHome;
