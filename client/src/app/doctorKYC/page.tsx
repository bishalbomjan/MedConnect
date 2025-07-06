'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, User, Award, FileText, Stethoscope } from 'lucide-react';
import apiClient from '../api-client';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

// Validation schema using Yup
const doctorKycSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Full name must be at least 2 characters')
        .required('Full name is required'),
    degree: Yup.string().required('Degree is required'),
    NMCID: Yup.string()
        .matches(/^[A-Z0-9]+$/, 'NMC ID must contain only uppercase letters and numbers')
        .required('NMC ID is required'),
    specializations: Yup.array()
        .of(Yup.string().required('Specialization is required'))
        .min(1, 'At least one specialization is required')
        .required('Specializations are required'),
    experience: Yup.array().of(
        Yup.object().shape({
            body: Yup.string().required('Experience description is required'),
            date: Yup.date().required('Date is required'),
        })
    ),
    experienceYear: Yup.string()
        .matches(/^\d+$/, 'Experience year must be a number')
        .required('Experience year is required'),
});

const specializationOptions = [
    'Cardiology',
    'Dermatology',
    'Emergency Medicine',
    'Endocrinology',
    'Family Medicine',
    'Gastroenterology',
    'General Surgery',
    'Internal Medicine',
    'Neurology',
    'Obstetrics and Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Urology',
];

const DoctorKyc = () => {
    const initialValues = {
        fullname: '',
        degree: '',
        NMCID: '',
        specializations: [''],
        experience: [{ body: '', date: '' }],
        experienceYear: '', // NEW
    };

    const { _id } = useSelector(state => state.user)
    const handleSubmit = async (values: any) => {
        const response = await apiClient.post(`/doctorkycs/${_id}`, values)

        if (response.data) {
            toast(response.data.message)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Doctor KYC Verification</h1>
                    <p className="text-green-600">Complete your profile to join MedConnect</p>
                </div>

                <Card className="border-green-200 shadow-lg">
                    <CardHeader className="bg-green-50 border-b border-green-100">
                        <CardTitle className="text-green-800 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Professional Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={doctorKycSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue, isSubmitting }) => (
                                <Form className="space-y-6">
                                    {/* Personal Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        <div className="space-y-2">
                                            <Label htmlFor="degree" className="text-green-700 font-medium">
                                                Medical Degree *
                                            </Label>
                                            <Field
                                                as={Input}
                                                id="degree"
                                                name="degree"
                                                placeholder="e.g., MBBS, MD, MS"
                                                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                            />
                                            <ErrorMessage name="degree" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* NMC ID */}
                                    <div className="space-y-2">
                                        <Label htmlFor="NMCID" className="text-green-700 font-medium">
                                            NMC Registration ID *
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="NMCID"
                                            name="NMCID"
                                            placeholder="Enter your NMC registration number"
                                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                        />
                                        <ErrorMessage name="NMCID" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Experience Year */}
                                    <div className="space-y-2">
                                        <Label htmlFor="experienceYear" className="text-green-700 font-medium">
                                            Total Years of Experience *
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="experienceYear"
                                            name="experienceYear"
                                            placeholder="Enter total years of experience"
                                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                        />
                                        <ErrorMessage name="experienceYear" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Specializations */}
                                    <div className="space-y-4">
                                        <Label className="text-green-700 font-medium flex items-center">
                                            <Stethoscope className="w-4 h-4 mr-2" />
                                            Specializations *
                                        </Label>
                                        <FieldArray name="specializations">
                                            {({ push, remove }) => (
                                                <div className="space-y-3">
                                                    {values.specializations.map((specialization, index) => (
                                                        <div key={index} className="flex items-center space-x-2">
                                                            <div className="flex-1">
                                                                <Select
                                                                    value={specialization}
                                                                    onValueChange={(value) => setFieldValue(`specializations.${index}`, value)}
                                                                >
                                                                    <SelectTrigger className="border-green-200 focus:border-green-500">
                                                                        <SelectValue placeholder="Select a specialization" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {specializationOptions.map((option) => (
                                                                            <SelectItem key={option} value={option}>
                                                                                {option}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <ErrorMessage
                                                                    name={`specializations.${index}`}
                                                                    component="div"
                                                                    className="text-red-500 text-sm mt-1"
                                                                />
                                                            </div>
                                                            {values.specializations.length > 1 && (
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => remove(index)}
                                                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => push('')}
                                                        className="border-green-300 text-green-600 hover:bg-green-50"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Add Specialization
                                                    </Button>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>

                                    {/* Experience Section */}
                                    <div className="space-y-4">
                                        <Label className="text-green-700 font-medium flex items-center">
                                            <Award className="w-4 h-4 mr-2" />
                                            Professional Experience
                                        </Label>
                                        <FieldArray name="experience">
                                            {({ push, remove }) => (
                                                <div className="space-y-4">
                                                    {values.experience.map((exp, index) => (
                                                        <Card key={index} className="border-green-100">
                                                            <CardContent className="p-4">
                                                                <div className="flex justify-between items-start mb-3">
                                                                    <h4 className="font-medium text-green-800">Experience {index + 1}</h4>
                                                                    {values.experience.length > 1 && (
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => remove(index)}
                                                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                    <div className="md:col-span-2 space-y-2">
                                                                        <Label htmlFor={`experience.${index}.body`} className="text-green-700">
                                                                            Description
                                                                        </Label>
                                                                        <Field
                                                                            as={Textarea}
                                                                            id={`experience.${index}.body`}
                                                                            name={`experience.${index}.body`}
                                                                            placeholder="Describe your role, responsibilities, and achievements"
                                                                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                                                            rows={3}
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`experience.${index}.body`}
                                                                            component="div"
                                                                            className="text-red-500 text-sm"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor={`experience.${index}.date`} className="text-green-700">
                                                                            Date
                                                                        </Label>
                                                                        <Field
                                                                            as={Input}
                                                                            type="date"
                                                                            id={`experience.${index}.date`}
                                                                            name={`experience.${index}.date`}
                                                                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`experience.${index}.date`}
                                                                            component="div"
                                                                            className="text-red-500 text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => push({ body: '', date: '' })}
                                                        className="border-green-300 text-green-600 hover:bg-green-50"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Add Experience
                                                    </Button>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-center pt-6">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit KYC Application'}
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

export default DoctorKyc;
