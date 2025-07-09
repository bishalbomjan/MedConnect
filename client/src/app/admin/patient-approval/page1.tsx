'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, UserX, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/app/api-client';

interface Patient {
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

const mockPatients: Patient[] = [
    {
        _id: '1',
        email: 'patient.smith@email.com',
        role: 'patient',
        phoneNumber: '+1 (555) 123-4567',
        location: 'New York, NY',
        isApproved: false,
        name: 'Sarah Smith',
        specialization: 'General Care',
        experience: '2 years'
    },
    {
        _id: '2',
        email: 'patient.johnson@email.com',
        role: 'patient',
        phoneNumber: '+1 (555) 987-6543',
        location: 'Los Angeles, CA',
        isApproved: false,
        name: 'Michael Johnson',
        specialization: 'Wellness',
        experience: '1 year'
    },
    {
        _id: '3',
        email: 'patient.williams@email.com',
        role: 'patient',
        phoneNumber: '+1 (555) 456-7890',
        location: 'Chicago, IL',
        isApproved: false,
        name: 'Emily Williams',
        specialization: 'Health Monitoring',
        experience: '3 years'
    }
];

const PatientApproval = () => {
    const [patients, setPatients] = useState<Patient[]>(mockPatients);
    const fetchPatient = async () => {
        apiClient.get('/user?role=patient&isApproved=false')
    }
    const handleApprove = (patientId: string) => {
        setPatients(prev =>
            prev.map(patient =>
                patient._id === patientId
                    ? { ...patient, isApproved: true }
                    : patient
            )
        );
        toast.success('Patient approved successfully!');
    };

    const handleReject = (patientId: string) => {
        setPatients(prev => prev.filter(patient => patient._id !== patientId));
        toast.error('Patient application rejected');
    };

    const pendingPatients = patients.filter(patient => !patient.isApproved);
    const approvedPatients = patients.filter(patient => patient.isApproved);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">Patient Approval Dashboard</h1>
                    <p className="text-green-600 text-lg">Review and approve patient registrations</p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-green-200 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Pending</p>
                                    <p className="text-3xl font-bold text-green-800">{pendingPatients.length}</p>
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
                                    <p className="text-3xl font-bold text-green-800">{approvedPatients.length}</p>
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
                                    <p className="text-3xl font-bold text-green-800">{patients.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Pending Approvals */}
                {pendingPatients.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Pending Approvals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingPatients.map((patient) => (
                                <PatientCard
                                    key={patient._id}
                                    patient={patient}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Approved Patients */}
                {approvedPatients.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Approved Patients</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {approvedPatients.map((patient) => (
                                <PatientCard
                                    key={patient._id}
                                    patient={patient}
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

interface PatientCardProps {
    patient: Patient;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
    showActions?: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({
    patient,
    onApprove,
    onReject,
    showActions = true
}) => {
    return (
        <Card className="border-green-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800 text-lg">{patient.name}</CardTitle>
                    <Badge variant={patient.isApproved ? "default" : "secondary"}
                        className={patient.isApproved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {patient.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                </div>
                {patient.specialization && (
                    <p className="text-green-600 font-medium">{patient.specialization}</p>
                )}
                {patient.experience && (
                    <p className="text-gray-600 text-sm">{patient.experience} experience</p>
                )}
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{patient.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{patient.phoneNumber}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{patient.location}</span>
                </div>

                {showActions && !patient.isApproved && (
                    <div className="flex space-x-2 pt-4">
                        <Button
                            onClick={() => onApprove?.(patient._id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                        >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Approve
                        </Button>
                        <Button
                            onClick={() => onReject?.(patient._id)}
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

export default PatientApproval;