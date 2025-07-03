'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, UserX, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Doctor {
    _id: string;
    email: string;
    role: string;
    phoneNumber: string;
    location: string;
    isApproved: boolean;
    name?: string;
    specialization?: string;
    experience?: string;
}

const mockDoctors: Doctor[] = [
    {
        _id: '1',
        email: 'dr.smith@hospital.com',
        role: 'doctor',
        phoneNumber: '+1 (555) 123-4567',
        location: 'New York, NY',
        isApproved: false,
        name: 'Dr. Sarah Smith',
        specialization: 'Cardiology',
        experience: '8 years'
    },
    {
        _id: '2',
        email: 'dr.johnson@clinic.com',
        role: 'doctor',
        phoneNumber: '+1 (555) 987-6543',
        location: 'Los Angeles, CA',
        isApproved: false,
        name: 'Dr. Michael Johnson',
        specialization: 'Pediatrics',
        experience: '12 years'
    },
    {
        _id: '3',
        email: 'dr.williams@medical.com',
        role: 'doctor',
        phoneNumber: '+1 (555) 456-7890',
        location: 'Chicago, IL',
        isApproved: false,
        name: 'Dr. Emily Williams',
        specialization: 'Dermatology',
        experience: '6 years'
    }
];

const DoctorApproval = () => {
    const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

    const handleApprove = (doctorId: string) => {
        setDoctors(prev =>
            prev.map(doctor =>
                doctor._id === doctorId
                    ? { ...doctor, isApproved: true }
                    : doctor
            )
        );
        toast.success('Doctor approved successfully!');
    };

    const handleReject = (doctorId: string) => {
        setDoctors(prev => prev.filter(doctor => doctor._id !== doctorId));
        toast.error('Doctor application rejected');
    };

    const pendingDoctors = doctors.filter(doctor => !doctor.isApproved);
    const approvedDoctors = doctors.filter(doctor => doctor.isApproved);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">Doctor Approval Dashboard</h1>
                    <p className="text-green-600 text-lg">Review and approve doctor applications</p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-green-200 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Pending</p>
                                    <p className="text-3xl font-bold text-green-800">{pendingDoctors.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Approved</p>
                                    <p className="text-3xl font-bold text-green-800">{approvedDoctors.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Total</p>
                                    <p className="text-3xl font-bold text-green-800">{doctors.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Pending Approvals */}
                {pendingDoctors.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Pending Approvals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingDoctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor._id}
                                    doctor={doctor}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Approved Doctors */}
                {approvedDoctors.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Approved Doctors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {approvedDoctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor._id}
                                    doctor={doctor}
                                    showActions={false}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

interface DoctorCardProps {
    doctor: Doctor;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
    showActions?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    doctor,
    onApprove,
    onReject,
    showActions = true
}) => {
    return (
        <Card className="border-green-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800 text-lg">{doctor.name}</CardTitle>
                    <Badge variant={doctor.isApproved ? "default" : "secondary"}
                        className={doctor.isApproved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {doctor.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                </div>
                {doctor.specialization && (
                    <p className="text-green-600 font-medium">{doctor.specialization}</p>
                )}
                {doctor.experience && (
                    <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
                )}
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{doctor.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{doctor.phoneNumber}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{doctor.location}</span>
                </div>

                {showActions && !doctor.isApproved && (
                    <div className="flex space-x-2 pt-4">
                        <Button
                            onClick={() => onApprove?.(doctor._id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                        >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Approve
                        </Button>
                        <Button
                            onClick={() => onReject?.(doctor._id)}
                            variant="outline"
                            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                            size="sm"
                        >
                            <UserX className="w-4 h-4 mr-1" />
                            Reject
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DoctorApproval;