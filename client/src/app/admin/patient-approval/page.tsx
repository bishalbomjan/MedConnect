'use client'
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User, Calendar, MapPin, Phone, Mail, Heart } from "lucide-react";
import apiClient from "@/app/api-client";
import { toast } from "sonner";

const PatientApproval = () => {


    const handleReject = (patientId: string) => {
        setPatients(patients.filter(patient => patient._id !== patientId));
    };

    const [patients, setPatients] = useState([]);

    const fetchPendingPatient = async () => {
        try {
            const response = await apiClient.get("/patientKyc?status=pending");
            setPatients(response.data);
        } catch (error) {
            toast.error("Failed to fetch pending patients.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPendingPatient();
    }, []);

    const handleApproval = async (patientId) => {
        console.log(patientId)
        debugger
        try {
            const response = await apiClient.patch(`/patientKyc/${patientId}`);
            toast(response.data.message);
            fetchPendingPatient(); // Refresh the list after approval
        } catch (error) {
            toast.error("Failed to approve patient.");
            console.error(error);
        }
    };

    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birth = new Date(dateOfBirth);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const pendingPatients = patients.filter(patient => patient.isKycSubmitted && !patient.isKycApproved);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-2">Patient Approval Center</h1>
                    <p className="text-muted-foreground">Review and approve pending patient registrations</p>
                    <div className="mt-4">
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                            {pendingPatients.length} Pending Approvals
                        </Badge>
                    </div>
                </div>

                {pendingPatients.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
                            <p className="text-muted-foreground">No pending patient approvals at the moment.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pendingPatients.map((patient) => (
                            <Card key={patient._id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{patient.fullname}</CardTitle>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    Age: {calculateAge(patient.dateOfBirth)}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800">
                                            Pending
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span className="truncate">{patient.patient.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{patient.patient.phoneNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span className="capitalize">{patient.patient.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="capitalize">{patient.patient.role}</span>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 p-3 rounded-lg">
                                        <h4 className="font-medium mb-2 text-sm">Personal Information</h4>
                                        <div className="text-sm text-muted-foreground">
                                            <p>Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                                            <p>Patient ID: {patient._id.slice(-8)}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <Button
                                            onClick={() => handleApproval(patient._id)}
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => handleReject(patient._id)}
                                            variant="destructive"
                                            className="flex-1"
                                        >
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Reject
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientApproval;