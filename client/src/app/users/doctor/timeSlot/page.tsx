'use client'
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Plus, User } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/app/api-client';
import { useSelector } from 'react-redux';

const timeSlotSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    startTime: Yup.string()
        .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
        .required('Start time is required'),
    endTime: Yup.string()
        .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
        .required('End time is required')
        .test('is-after-start', 'End time must be after start time', function (value) {
            const { startTime } = this.parent;
            if (!startTime || !value) return true;

            const start = new Date(`2000-01-01T${startTime}:00`);
            const end = new Date(`2000-01-01T${value}:00`);
            return end > start;
        }),
});

interface TimeSlotFormData {
    date: string;
    startTime: string;
    endTime: string;
}

const DoctorCreateSlot = () => {
    const initialValues: TimeSlotFormData = {
        date: '',
        startTime: '',
        endTime: '',
    };
    const { _id } = useSelector(state => state.user)

    const handleSubmit = async (values: TimeSlotFormData,) => {
        const response = await apiClient.post(`/timeslot/${_id}`, values)
        toast(response.data.message)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">Create Time Slot</h1>
                    <p className="text-green-600 text-lg">Add a new appointment time slot for your patients</p>
                </div>

                <Card className="border-green-200 bg-white shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                        <CardTitle className="flex items-center text-xl">
                            <Plus className="w-6 h-6 mr-2" />
                            New Time Slot
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-8">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={timeSlotSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, resetForm }) => (
                                <Form className="space-y-6">
                                    {/* Date Field */}
                                    <div>
                                        <Label htmlFor="date" className="text-green-700 font-semibold flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Date
                                        </Label>
                                        <Field
                                            as={Input}
                                            type="date"
                                            name="date"
                                            id="date"
                                            placeholder="Select date"
                                            className="border-green-200 focus:border-green-500 focus:ring-green-500 mt-2"
                                        />
                                        <ErrorMessage name="date" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    {/* Time Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="startTime" className="text-green-700 font-semibold flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                Start Time
                                            </Label>
                                            <Field
                                                as={Input}
                                                type="time"
                                                name="startTime"
                                                id="startTime"
                                                placeholder="HH:MM"
                                                className="border-green-200 focus:border-green-500 focus:ring-green-500 mt-2"
                                            />
                                            <ErrorMessage name="startTime" component="div" className="text-red-600 text-sm mt-1" />
                                        </div>

                                        <div>
                                            <Label htmlFor="endTime" className="text-green-700 font-semibold flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                End Time
                                            </Label>
                                            <Field
                                                as={Input}
                                                type="time"
                                                name="endTime"
                                                id="endTime"
                                                placeholder="HH:MM"
                                                className="border-green-200 focus:border-green-500 focus:ring-green-500 mt-2"
                                            />
                                            <ErrorMessage name="endTime" component="div" className="text-red-600 text-sm mt-1" />
                                        </div>
                                    </div>

                                    {/* Doctor Info Display */}
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center space-x-2 text-green-700">
                                            <User className="w-5 h-5" />
                                            <span className="font-medium">Doctor: Dr. John Smith</span>
                                        </div>
                                        <p className="text-green-600 text-sm mt-1">
                                            This time slot will be created for your account
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end space-x-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => resetForm()}
                                            className="border-green-300 text-green-700 hover:bg-green-50"
                                        >
                                            Clear Form
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white px-8"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Create Time Slot
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>

                {/* Additional Info */}
                <Card className="mt-6 border-green-200 bg-green-50">
                    <CardContent className="p-6">
                        <h3 className="text-green-800 font-semibold mb-3">Time Slot Guidelines</h3>
                        <ul className="text-green-700 space-y-2 text-sm">
                            <li>• Each time slot should be at least 30 minutes long</li>
                            <li>• Make sure to leave buffer time between appointments</li>
                            <li>• Time slots are automatically marked as available for booking</li>
                            <li>• You can view and manage your slots in the Time Slots section</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DoctorCreateSlot;