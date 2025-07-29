'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin, Lock, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../api-client.js'
import { toast } from 'sonner';
import { useRouter } from 'next/router.js';

// Validation schema using Yup
const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    role: Yup.string()
        .oneOf(['patient', 'doctor'], 'Please select a valid role')
        .required('Role is required'),
    phoneNumber: Yup.string()
        .matches(/^[+]?[\d\s\-()]+$/, 'Please enter a valid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required'),
    location: Yup.string()
        .min(3, 'Location must be at least 3 characters')
        .required('Location is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/(?=.*\d)/, 'Password must contain at least one number')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

// Initial form values
const initialValues = {
    email: '',
    role: '',
    phoneNumber: '',
    location: '',
    password: '',
    confirmPassword: '',
};

const Register = () => {
    const router = useRouter()
    const handleSubmit = async (values: typeof initialValues) => {
        const { data } = await apiClient.post('/register', values)
        toast(data.message)
        router.push('/loginPage')
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-green-400 p-3 rounded-full shadow-lg">
                            <Stethoscope className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-green-600 mb-2">MedConnect</h1>
                    <p className="text-gray-600">Join our healthcare community</p>
                </div>

                {/* Registration Form */}
                <Card className="shadow-xl border-green-200 bg-white backdrop-blur-sm animate-fade-in">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl text-green-600">Create Account</CardTitle>
                        <CardDescription className="text-gray-600">Enter your details to get started</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                                <Form className="space-y-4">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-green-700">
                                            <Mail className="inline h-4 w-4 mr-1" />
                                            Email Address
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 border-green-200"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Role Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="role" className="text-sm font-medium text-green-700">
                                            <User className="inline h-4 w-4 mr-1" />
                                            Role
                                        </Label>
                                        <Select onValueChange={(value) => setFieldValue('role', value)}>
                                            <SelectTrigger className="focus:ring-2 focus:ring-green-300 focus:border-green-400 border-green-200">
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="patient">Patient</SelectItem>
                                                <SelectItem value="doctor">Doctor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Phone Number Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneNumber" className="text-sm font-medium text-green-700">
                                            <Phone className="inline h-4 w-4 mr-1" />
                                            Phone Number
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 border-green-200"
                                        />
                                        <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Location Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-sm font-medium text-green-700">
                                            <MapPin className="inline h-4 w-4 mr-1" />
                                            Address
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="location"
                                            name="location"
                                            type="text"
                                            placeholder="Enter your location"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 border-green-200"
                                        />
                                        <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium text-green-700">
                                            <Lock className="inline h-4 w-4 mr-1" />
                                            Password
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Create a strong password"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 border-green-200"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-green-700">
                                            <Lock className="inline h-4 w-4 mr-1" />
                                            Confirm Password
                                        </Label>
                                        <Field
                                            as={Input}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 border-green-200"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                                    >
                                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                                    </Button>

                                    {/* Sign In Link */}
                                    <div className="text-center mt-6">
                                        <p className="text-sm text-gray-600">
                                            Already have an account?{' '}
                                            <Link
                                                href="/loginPage"
                                                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                                            >
                                                Sign in here
                                            </Link>
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 animate-fade-in">
                    <p className="text-sm text-gray-600">
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;