"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { toast } from "sonner";
import apiClient from "../api-client"; // adjust path as needed
import { useSelector } from "react-redux";

// Validation schema
const patientKycSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
    dateOfBirth: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future")
        .required("Date of birth is required"),
});

const PatientKyc = () => {
    const { _id } = useSelector(state => state.user)
    const [result, setResult] = useState([])
    const initialValues = {
        fullname: "",
        dateOfBirth: "",
    };

    const handleSubmit = async (values: typeof initialValues) => {
        const response = await apiClient.post(`/patientKyc/${_id}`, values)
        if (response.data) {
            toast(response.data.message)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4 flex items-center justify-center">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Patient KYC Verification</h1>
                    <p className="text-green-600">Complete your profile to continue using MedConnect</p>
                </div>

                {/* Form */}
                <Card className="border-green-200 shadow-lg">
                    <CardHeader className="bg-green-50 border-b border-green-100">
                        <CardTitle className="text-green-800 flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={patientKycSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="fullname" className="text-green-700 font-medium">
                                            Full Name *
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="fullname"
                                            name="fullname"
                                            placeholder="Enter your full name"
                                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                        />
                                        <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth" className="text-green-700 font-medium">
                                            Date of Birth *
                                        </Label>
                                        <Field
                                            as={Input}
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                        />
                                        <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Submit */}
                                    <div className="flex justify-center pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit KYC"}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PatientKyc;
