'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Validation schema
const appointmentSchema = Yup.object().shape({
    appointmentDate: Yup.date()
        .required('Please select an appointment date')
        .min(new Date().toISOString().split('T')[0], 'Cannot select past dates')
        .typeError('Please enter a valid date'),
});

const AppointmentBooking = () => {
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (values: { appointmentDate: string }) => {
        console.log('Appointment booked for:', values.appointmentDate);
        toast.success(`Appointment booked for ${new Date(values.appointmentDate).toLocaleDateString()}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-green-600 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Heart className="h-8 w-8 text-white" />
                            <h1 className="text-2xl font-bold text-white">MedConnect</h1>
                        </Link>
                        <div className="flex space-x-4">
                            <Link href="/patient">
                                <Button
                                    variant="outline"
                                    className="border-white text-white hover:bg-green-500"
                                >
                                    Back to Portal
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-700 mb-2">Book Your Appointment</h2>
                    <p className="text-green-600">Select your preferred date for the appointment</p>
                </div>

                <Card className="border-green-200 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center text-green-700">
                            <Calendar className="h-6 w-6 mr-2" />
                            Select Appointment Date
                        </CardTitle>
                        <CardDescription className="text-green-600">
                            Choose a date from today onwards for your medical appointment
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Formik
                            initialValues={{ appointmentDate: '' }}
                            validationSchema={appointmentSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values }) => (
                                <Form className="space-y-6">
                                    <div>
                                        <label htmlFor="appointmentDate" className="block text-sm font-medium text-green-700 mb-2">
                                            Appointment Date
                                        </label>
                                        <Field
                                            type="date"
                                            id="appointmentDate"
                                            name="appointmentDate"
                                            min={today}
                                            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-900 text-lg"
                                        />
                                        <ErrorMessage
                                            name="appointmentDate"
                                            component="div"
                                            className="mt-2 text-sm text-red-600 font-medium"
                                        />
                                    </div>

                                    {values.appointmentDate && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                                                <span className="text-green-800 font-medium">
                                                    Selected Date:{' '}
                                                    {new Date(values.appointmentDate).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
                                    >
                                        {isSubmitting ? 'Booking...' : 'Book Appointment'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Important Notes</h3>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li>• Appointments can only be booked for today or future dates</li>
                            <li>• You will receive a confirmation email once your appointment is booked</li>
                            <li>• Please arrive 15 minutes before your scheduled time</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBooking;
