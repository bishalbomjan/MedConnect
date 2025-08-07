"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Heart, User, Calendar, Phone, Mail, MapPin, Shield,
    CheckCircle, XCircle, Clock
} from "lucide-react";
import apiClient from "@/app/api-client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Define type for form data
type FormData = {
    email?: string;
    role?: string;
    phoneNumber?: string;
    location?: string;
    fullname?: string;
    dateOfBirth?: string;
    isKycSubmitted?: boolean;
    isKycApproved?: boolean;
};

const PatientProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<FormData>({});
    const { _id } = useSelector((state: any) => state.user);
    const router = useRouter()
    useEffect(() => {
        fetchProfilePatient();
    }, []);
    console.log("Patient Profile Data:", formData);
    console.log("User ID:", _id);
    const fetchProfilePatient = async () => {
        try {
            const res = await apiClient.get(`/patientKyc/${_id}`);
            if (res?.data?.isKycSubmitted) {
                setFormData(res.data);
            } else {
                throw new Error("No KYC submitted");
            }
        } catch {
            const response = await apiClient.get(`/user/${_id}`);
            setFormData(response.data);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        toast.info("Changes discarded");
    };

    const getKycStatusBadge = () => {
        if (!formData.isKycSubmitted) {
            return (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    <Clock className="h-3 w-3 mr-1" /> Not Submitted
                </Badge>
            );
        }
        if (formData.isKycSubmitted && !formData.isKycApproved) {
            return (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" /> Pending Approval
                </Badge>
            );
        }
        return (
            <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" /> Approved
            </Badge>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Heart className="h-8 w-8 text-green-600" />
                            <h1 className="text-2xl font-bold text-gray-900">MedConnect</h1>
                        </Link>
                        <div className="flex space-x-4">
                            <Link href="/patient">
                                <Button
                                    variant="outline"
                                    className="border-green-200 text-green-700 hover:bg-green-50"
                                >
                                    Back to Portal
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Profile</h2>
                    <p className="text-gray-600">Manage your personal and medical information</p>
                </div>

                <div className="grid gap-6">
                    {/* Profile Overview */}
                    <Card className="border-green-100 shadow-lg">
                        <CardHeader className="bg-green-50 border-b border-green-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <User className="h-8 w-8 text-green-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-green-800 text-2xl">{formData.fullname || "Patient"}</CardTitle>
                                        <CardDescription className="text-green-600">Patient ID: #P001</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {getKycStatusBadge()}
                                    <Shield className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Personal Information */}
                    <Card className="border-green-100 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-green-800">Personal Information</CardTitle>
                                <CardDescription>Your basic personal details</CardDescription>
                            </div>
                            <Button
                                onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
                                variant="outline"
                                className="border-green-200 text-green-700 hover:bg-green-50"
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { label: "Full Name", field: "fullname", icon: User, type: "text" },
                                    { label: "Date of Birth", field: "dateOfBirth", icon: Calendar, type: "date" },
                                    { label: "Email Address", field: "email", icon: Mail, type: "email" },
                                    { label: "Phone Number", field: "phoneNumber", icon: Phone, type: "text" },
                                    { label: "Location", field: "location", icon: MapPin, type: "text" },
                                ].map(({ label, field, icon: Icon, type }) => (
                                    <div key={field}>
                                        <Label htmlFor={field} className="text-gray-700 font-medium">{label}</Label>
                                        {isEditing ? (
                                            <Input
                                                id={field}
                                                type={type}
                                                value={formData[field] || ""}
                                                onChange={(e) => handleInputChange(field, e.target.value)}
                                                className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                                            />
                                        ) : (
                                            <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                                                <div className="flex items-center">
                                                    <Icon className="h-4 w-4 text-gray-400 mr-2" />
                                                    {field === "dateOfBirth" && formData.dateOfBirth
                                                        ? new Date(formData.dateOfBirth).toLocaleDateString()
                                                        : formData[field] || "N/A"}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div>
                                    <Label htmlFor="role" className="text-gray-700 font-medium">Role</Label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 text-gray-400 mr-2" />
                                            <Badge className="bg-green-100 text-green-800 capitalize">
                                                {formData.role || "patient"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex space-x-4 pt-4">
                                    <Button
                                        onClick={handleSave}
                                        className="bg-green-600 text-white hover:bg-green-700 flex-1"
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        onClick={handleCancel}
                                        variant="outline"
                                        className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* KYC Status */}
                    <Card className="border-green-100 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-green-800 flex items-center">
                                <Shield className="h-5 w-5 mr-2" />
                                KYC Verification Status
                            </CardTitle>
                            <CardDescription>Know Your Customer verification details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Submission */}
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                            {formData.isKycSubmitted ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <Clock className="h-5 w-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">KYC Submission</h4>
                                            <p className="text-sm text-gray-600">
                                                {formData.isKycSubmitted ? "Documents submitted" : "Pending submission"}
                                            </p>
                                        </div>
                                    </div>
                                    {getKycStatusBadge()}
                                </div>

                                {/* Approval */}
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                            {formData.isKycApproved ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">KYC Approval</h4>
                                            <p className="text-sm text-gray-600">
                                                {formData.isKycApproved ? "Verification approved" : "Awaiting approval"}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={formData.isKycApproved ? "default" : "secondary"}
                                        className={
                                            formData.isKycApproved
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-700"
                                        }
                                    >
                                        {formData.isKycApproved ? "Approved" : "Pending"}
                                    </Badge>
                                </div>

                                {!formData.isKycSubmitted && (
                                    <Button className="w-full bg-green-600 text-white hover:bg-green-700" onClick={() => router.push('/patientKYC')}>
                                        Submit KYC Documents
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
