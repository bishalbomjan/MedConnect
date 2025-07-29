'use client'
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle,
    XCircle,
    User,
    GraduationCap,
    MapPin,
    Phone,
    Mail,
    Stethoscope,
    Calendar
} from "lucide-react";
import apiClient from "@/app/api-client";
import { toast } from "sonner";

const DoctorApproval = () => {

    const [doctors, setDoctors] = useState([]);

    const fetchPendingDoctor = async () => {
        try {
            const response = await apiClient.get("/doctorkycs?status=pending");
            setDoctors(response.data);
        } catch (error) {
            toast.error("Failed to fetch pending doctors.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPendingDoctor();
    }, []);

    const handleApprove = async (kycId) => {
        try {
            const doc = await apiClient.patch(`/doctorkycs/${kycId}`);
            toast.success(doc.data.message);
            fetchPendingDoctor();
        } catch (error) {
            toast.error("Failed to approve doctor.");
            console.error(error);
        }
    };

    const handleReject = async (kycId) => {
        try {
            const doc = await apiClient.patch(`/doctorkycs/${kycId}`, { reject: true });
            toast.success("Doctor rejected.");
            fetchPendingDoctor();
        } catch (error) {
            toast.error("Failed to reject doctor.");
            console.error(error);
        }
    };

    const pendingDoctors = doctors.filter(doc => doc.isKycSubmitted && !doc.isKycApproved);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-green-50 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-green-700 mb-2">Doctor Approval Center</h1>
                    <p className="text-gray-600">Review and approve pending doctor applications</p>
                    <div className="mt-4">
                        <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-700 border-green-200">
                            {pendingDoctors.length} Pending Approvals
                        </Badge>
                    </div>
                </div>

                {pendingDoctors.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
                            <p className="text-gray-500">No pending doctor approvals at the moment.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pendingDoctors.map((doctor) => (
                            <Card key={doctor._id} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-green-600">
                                <CardHeader className="bg-gradient-to-r from-green-100 to-green-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                                                <User className="h-6 w-6 text-green-700" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg text-green-800">{doctor.fullname}</CardTitle>
                                                <div className="flex items-center gap-1 text-sm text-green-600">
                                                    <GraduationCap className="h-4 w-4" />
                                                    {doctor.degree}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                                            Pending
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            <span className="truncate">{doctor.doctor?.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <span>{doctor.doctor?.phoneNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-500" />
                                            <span className="capitalize">{doctor.doctor?.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Stethoscope className="h-4 w-4 text-gray-500" />
                                            <span>{doctor.NMCID}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2 text-green-700">Specializations</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {doctor?.specializations.map((spec, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                                                    {spec}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2 flex items-center gap-2 text-green-700">
                                            <Calendar className="h-4 w-4" />
                                            Experience: {doctor.experienceYear} years
                                        </h4>
                                        {doctor.experience?.map((exp) => (
                                            <div key={exp._id} className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                                                {exp.body}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <Button
                                            onClick={() => handleApprove(doctor._id)}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => handleReject(doctor._id)}
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

export default DoctorApproval;
