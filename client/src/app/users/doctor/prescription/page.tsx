"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Plus,
    Trash2,
    Save,
    Pill,
    TestTube,
    ClipboardList,
    Stethoscope,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";

const medicationSchema = Yup.object().shape({
    name: Yup.string().required("Medication name is required"),
    dosage: Yup.string(),
    frequency: Yup.string(),
    duration: Yup.string(),
    instructions: Yup.string(),
});

const testSchema = Yup.object().shape({
    testName: Yup.string().required("Test name is required"),
    reason: Yup.string(),
    urgency: Yup.string(),
});

const prescriptionSchema = Yup.object().shape({
    examinationNotes: Yup.string().required("Examination notes are required"),
    diagnosis: Yup.string().required("Diagnosis is required"),
    medications: Yup.array()
        .of(medicationSchema)
        .min(1, "At least one medication is required"),
    suggestedTests: Yup.array().of(testSchema),
    notes: Yup.string(),
});

const Prescription = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get("appointmentId") || "";

    const initialValues = {
        examinationNotes: "",
        diagnosis: "",
        medications: [
            { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
        ],
        suggestedTests: [],
        notes: "",
    };

    const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Prescription Data:", { appointmentId, ...values });

            // You can use your own toast here
            alert("Prescription created successfully!");

            resetForm();
        } catch (error) {
            alert("Failed to create prescription. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <ClipboardList className="h-8 w-8 text-green-600" />
                        <h1 className="text-3xl font-bold text-green-600">
                            Create Prescription & Examination
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Record examination details, prescribe medications, and recommend tests.
                    </p>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={prescriptionSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors }) => (
                        <Form className="max-w-4xl mx-auto space-y-6">
                            {/* Examination Notes */}
                            <Card className="border-green-100">
                                <CardHeader className="bg-green-50">
                                    <CardTitle className="flex items-center gap-2 text-green-600">
                                        <ClipboardList className="h-5 w-5" />
                                        Examination Notes
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Record your examination findings and diagnosis.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="examinationNotes" className="text-green-700 font-medium">
                                            Examination Findings *
                                        </Label>
                                        <Field
                                            as={Textarea}
                                            id="examinationNotes"
                                            name="examinationNotes"
                                            placeholder="Enter examination findings..."
                                            className="min-h-[120px] resize-none mt-1 placeholder:text-gray-400"
                                        />
                                        <ErrorMessage
                                            name="examinationNotes"
                                            component="p"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="diagnosis" className="text-green-700 font-medium">
                                            Diagnosis *
                                        </Label>
                                        <Field
                                            as={Textarea}
                                            id="diagnosis"
                                            name="diagnosis"
                                            placeholder="Enter diagnosis..."
                                            className="min-h-[80px] resize-none mt-1 placeholder:text-gray-400"
                                        />
                                        <ErrorMessage
                                            name="diagnosis"
                                            component="p"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Medications */}
                            <Card className="border-green-100">
                                <CardHeader className="bg-green-50">
                                    <CardTitle className="flex items-center gap-2 text-green-600">
                                        <Pill className="h-5 w-5" />
                                        Medications
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        List prescribed medications and instructions.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FieldArray name="medications">
                                        {({ push, remove }) => (
                                            <div className="space-y-6">
                                                {values.medications.map((med, index) => (
                                                    <div
                                                        key={index}
                                                        className="p-4 border border-green-100 rounded-lg bg-white"
                                                    >
                                                        <div className="flex justify-between items-center mb-4">
                                                            <Badge variant="outline" className="text-green-600 border-green-600">
                                                                Medication {index + 1}
                                                            </Badge>
                                                            {values.medications.length > 1 && (
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => remove(index)}
                                                                    className="text-red-500 border-red-500 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="md:col-span-2">
                                                                <Label className="text-green-700 font-medium">Name *</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`medications.${index}.name`}
                                                                    placeholder="Medication name"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                                <ErrorMessage
                                                                    name={`medications.${index}.name`}
                                                                    component="p"
                                                                    className="text-red-500 text-sm mt-1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-green-700 font-medium">Dosage</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`medications.${index}.dosage`}
                                                                    placeholder="e.g., 500mg"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-green-700 font-medium">Frequency</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`medications.${index}.frequency`}
                                                                    placeholder="e.g., Twice daily"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-green-700 font-medium">Duration</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`medications.${index}.duration`}
                                                                    placeholder="e.g., 7 days"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-green-700 font-medium">Instructions</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`medications.${index}.instructions`}
                                                                    placeholder="e.g., After meals"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        push({
                                                            name: "",
                                                            dosage: "",
                                                            frequency: "",
                                                            duration: "",
                                                            instructions: "",
                                                        })
                                                    }
                                                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Another Medication
                                                </Button>
                                                {errors.medications && typeof errors.medications === "string" && (
                                                    <p className="text-red-500 text-sm">{errors.medications}</p>
                                                )}
                                            </div>
                                        )}
                                    </FieldArray>
                                </CardContent>
                            </Card>

                            {/* Suggested Tests */}
                            <Card className="border-green-100">
                                <CardHeader className="bg-green-50">
                                    <CardTitle className="flex items-center gap-2 text-green-600">
                                        <TestTube className="h-5 w-5" />
                                        Suggested Tests
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Recommend tests if necessary.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FieldArray name="suggestedTests">
                                        {({ push, remove }) => (
                                            <div className="space-y-4">
                                                {values.suggestedTests.map((test, index) => (
                                                    <div
                                                        key={index}
                                                        className="p-4 border border-green-100 rounded-lg bg-white"
                                                    >
                                                        <div className="flex justify-between items-center mb-4">
                                                            <Badge variant="outline" className="text-green-600 border-green-600">
                                                                Test {index + 1}
                                                            </Badge>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => remove(index)}
                                                                className="text-red-500 border-red-500 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div>
                                                                <Label className="text-green-700 font-medium">Test Name *</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`suggestedTests.${index}.testName`}
                                                                    placeholder="e.g., Blood Test"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                                <ErrorMessage
                                                                    name={`suggestedTests.${index}.testName`}
                                                                    component="p"
                                                                    className="text-red-500 text-sm mt-1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-green-700 font-medium">Urgency</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`suggestedTests.${index}.urgency`}
                                                                    placeholder="e.g., Routine"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-green-700 font-medium">Reason</Label>
                                                                <Field
                                                                    as={Input}
                                                                    name={`suggestedTests.${index}.reason`}
                                                                    placeholder="Reason for test"
                                                                    className="mt-1 placeholder:text-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        push({ testName: "", reason: "", urgency: "" })
                                                    }
                                                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Suggested Test
                                                </Button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </CardContent>
                            </Card>

                            {/* Additional Notes */}
                            <Card className="border-green-100">
                                <CardHeader className="bg-green-50">
                                    <CardTitle className="flex items-center gap-2 text-green-600">
                                        <Stethoscope className="h-5 w-5" />
                                        Additional Notes
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Optional notes or instructions.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Field
                                        as={Textarea}
                                        name="notes"
                                        placeholder="Follow-up instructions, precautions..."
                                        className="min-h-[120px] resize-none placeholder:text-gray-400"
                                    />
                                </CardContent>
                            </Card>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-medium"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Create Prescription
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Prescription;
