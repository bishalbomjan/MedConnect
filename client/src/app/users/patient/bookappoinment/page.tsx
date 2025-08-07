'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { toast } from 'sonner';
import apiClient from '@/app/api-client';
import {
    User, MapPin, Heart, Brain, Eye, Bone, Shield, Smile, Baby, Cross, AlertCircle, Sun, Radiation, Droplet, Activity, Stethoscope, Calendar, Clock, FileText
} from 'lucide-react';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const specializations = [
    { name: 'Cardiology', icon: Heart },
    { name: 'Dermatology', icon: Sun },
    { name: 'Emergency Medicine', icon: AlertCircle },
    { name: 'Endocrinology', icon: Activity },
    { name: 'Family Medicine', icon: User },
    { name: 'Gastroenterology', icon: Stethoscope },
    { name: 'General Surgery', icon: Cross },
    { name: 'Internal Medicine', icon: Stethoscope },
    { name: 'Neurology', icon: Brain },
    { name: 'Obstetrics and Gynecology', icon: Baby },
    { name: 'Oncology', icon: Shield },
    { name: 'Ophthalmology', icon: Eye },
    { name: 'Orthopedics', icon: Bone },
    { name: 'Pediatrics', icon: Smile },
    { name: 'Psychiatry', icon: Brain },
    { name: 'Radiology', icon: Radiation },
    { name: 'Urology', icon: Droplet }
];

const PatientHome = () => {
    const [patient, setPatient] = useState([]);
    const { _id } = useSelector((state: any) => state.user);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
    const [availableDoctors, setAvailableDoctors] = useState<any[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
    const [timing, setTiming] = useState([])
    const appointmentSchema = Yup.object().shape({
        appointmentDate: Yup.date()
            .required('Please select an appointment date')
            .min(new Date().toISOString().split('T')[0], 'Cannot select past dates')
            .typeError('Please enter a valid date'),
    });

    const today = new Date().toISOString().split('T')[0];
    const fetchPatient = async () => {
        try {
            const response = await apiClient.get(`/patientKyc/${_id}`);
            setPatient(response.data);
            debugger
        } catch (err) {
            console.error('Failed to fetch patient:', err);
        }
    };
    useEffect(() => {
        debugger
        fetchPatient();
    }, []);

    const fetchSpecificDoctor = async (specialization: string) => {
        try {
            const response = await apiClient.get(`/doctorkycs?specialization=${encodeURIComponent(specialization)}`);
            setAvailableDoctors(response.data);
            setSelectedDoctor(null);
        } catch (err) {
            console.error('Failed to fetch doctors:', err);
        }
    };

    const handleTimeSlot = async (values: { appointmentDate: string }) => {
        const res = await apiClient.get(`/timeslot?doctorId=${selectedDoctor.doctor._id}&date=${values.appointmentDate}`)
        setTiming(res.data.slots)
    };

    const handleBookAppointment = async (id) => {
        const res = await apiClient.patch(`/timeslot/book/${id}/${_id}`)
        toast(res.data.message)
    };
    const renderBookingSection = () => (
        <div className="space-y-6">
            <Card className="border-green-200 bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-green-800">Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Specialization Selection */}
                    <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-4">Select Specialization</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {specializations.map((spec) => (
                                <Button
                                    key={spec.name}
                                    variant={selectedSpecialization === spec.name ? "default" : "outline"}
                                    onClick={() => {
                                        setSelectedSpecialization(spec.name);
                                        fetchSpecificDoctor(spec.name);
                                    }}
                                    className={`h-20 flex-col space-y-2 ${selectedSpecialization === spec.name
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'border-green-200 hover:bg-green-50'
                                        }`}
                                >
                                    <spec.icon className="w-6 h-6" />
                                    <span className="text-xs">{spec.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Doctor Selection */}
                    {selectedSpecialization && (
                        <div>
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Available Doctors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {availableDoctors.map((doctor) => (
                                    <Card
                                        key={doctor._id}
                                        className={`cursor-pointer transition-all ${selectedDoctor?._id === doctor._id
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-green-200 hover:border-green-300'
                                            }`}
                                        onClick={() => { setSelectedDoctor(doctor); }}
                                    >
                                        <CardContent className="p-4">
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-green-800">{doctor.fullname}</h4>
                                                <p className="text-green-600">{doctor.specializations.join(', ')}</p>
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm">{doctor.doctor?.location || "Unknown Location"}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Time Slot Selection */}
                    {selectedDoctor && (
                        <div>
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
                                        onSubmit={handleTimeSlot}
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
                                                <Button type='submit'
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium">
                                                    view timing
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </CardContent>
                            </Card>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {timing.map((item, idx) => (!item.isBooked &&
                                    <Card key={idx} onClick={() => { handleBookAppointment(item._id); console.log(item._id) }} className="bg-green-50 border border-green-200 hover:bg-green-100 transition-all">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm text-green-700 font-medium">
                                                Time Slot
                                            </CardTitle>
                                            <Clock className="h-4 w-4 text-green-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-md font-semibold text-gray-800">
                                                {item.startTime} - {item.endTime}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}


                </CardContent>
            </Card>
        </div>
    );
    if (patient.length === 0) return <div className="p-6">
        <p>You haven't submit the kyc form. Please Enter the kyc form.</p>
        <Button asChild>
            <Link href="/patientKYC">Enter your KYC Details</Link>
        </Button>
    </div>
    if (patient.length !== 0 && patient.isKycApproved === false) return <p>You are not verified yet.</p>
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
            debugger;
            <header className="bg-white shadow-sm border-b border-green-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-800">Patient Portal</h1>
                                {patient && <p className="text-green-600">Welcome back, {patient.fullname}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {renderBookingSection()}
            </main>
        </div>
    );
};

export default PatientHome;
