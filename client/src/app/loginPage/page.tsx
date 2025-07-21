'use client'
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addLoginDetails } from '@/redux/reducerSlices/userSlice.js';
import apiClient from '../api-client';

// Validation schema using Yup
const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const SignIn = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoggedIn, role } = useSelector((state: any) => state.user);

    // Redirect when logged in
    useEffect(() => {
        if (isLoggedIn && role === 'patient') router.push('/users/patient/profile');
        if (isLoggedIn && role === 'doctor') router.push('/users/doctor/profile');
        if (isLoggedIn && role === 'admin') router.push('/admin/patient-approval');
    }, [isLoggedIn, role, router]);

    // Initial form values
    const initialValues = {
        email: '',
        password: '',
    };

    // Handle form submission
    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const { data } = await apiClient.post('/login', values);
            toast(data?.message || 'Login successful');

            if (data) {
                dispatch(addLoginDetails(data));
            }

            if (data?.isLoggedIn && data?.role === 'patient') router.push('/users/patient/profile');
            if (data?.isLoggedIn && data?.role === 'doctor') router.push('/users/doctor/profile');
            if (data?.isLoggedIn && data?.role === 'admin') router.push('/admin/patient-approval');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'An error occurred during sign in');
        }
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
                    <p className="text-gray-600">Welcome back to our healthcare community</p>
                </div>

                {/* Sign In Form */}
                <Card className="shadow-xl border-green-200 bg-white backdrop-blur-sm animate-fade-in">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl text-green-600">Sign In</CardTitle>
                        <CardDescription className="text-gray-600">
                            Enter your credentials to continue
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={signInSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
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
                                            placeholder="Enter your password"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 border-green-200"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Forgot Password Link */}
                                    <div className="text-right">
                                        <Link
                                            href="#"
                                            className="text-sm text-green-600 hover:text-green-700 transition-colors duration-200"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                                    >
                                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                                    </Button>

                                    {/* Sign Up Link */}
                                    <div className="text-center mt-6">
                                        <p className="text-sm text-gray-600">
                                            Don't have an account?{' '}
                                            <Link
                                                href="/register"
                                                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                                            >
                                                Create one here
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
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
