'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, FileText, Activity, Phone, MapPin, Stethoscope, Heart, Brain, Eye, Bone } from 'lucide-react';
import { toast } from 'sonner';

interface Doctor {
    _id: string;
    name: string;
    specialization: string;
    location: string;
    rating: number;
    availableSlots: string[];
}

interface Appointment {
    _id: string;
    doctorName: string;
    specialization: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed' | 'cancelled';
}

interface MedicalRecord {
    _id: string;
    date: string;
    doctorName: string;
    diagnosis: string;
    prescription: string;
    notes: string;
}

const mockDoctors: Doctor[] = [
    {
        _id: '1',
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiology',
        location: 'New York, NY',
        rating: 4.8,
        availableSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    },
    {
        _id: '2',
        name: 'Dr. Michael Chen',
        specialization: 'Neurology',
        location: 'Los Angeles, CA',
        rating: 4.9,
        availableSlots: ['10:00 AM', '1:00 PM', '3:00 PM']
    },
    {
        _id: '3',
        name: 'Dr. Emily Davis',
        specialization: 'Ophthalmology',
        location: 'Chicago, IL',
        rating: 4.7,
        availableSlots: ['8:00 AM', '12:00 PM', '5:00 PM']
    },
    {
        _id: '4',
        name: 'Dr. Robert Wilson',
        specialization: 'Orthopedics',
        location: 'Houston, TX',
        rating: 4.6,
        availableSlots: ['9:30 AM', '2:30 PM', '4:30 PM']
    }
];

const mockAppointments: Appointment[] = [
    {
        _id: '1',
        doctorName: 'Dr. Sarah Johnson',
        specialization: 'Cardiology',
        date: '2024-01-15',
        time: '2:00 PM',
        status: 'upcoming'
    },
    {
        _id: '2',
        doctorName: 'Dr. Michael Chen',
        specialization: 'Neurology',
        date: '2024-01-10',
        time: '10:00 AM',
        status: 'completed'
    }
];

const mockMedicalRecords: MedicalRecord[] = [
    {
        _id: '1',
        date: '2024-01-10',
        doctorName: 'Dr. Michael Chen',
        diagnosis: 'Migraine Headache',
        prescription: 'Sumatriptan 50mg, Rest',
        notes: 'Patient reports improvement with prescribed medication'
    },
    {
        _id: '2',
        date: '2023-12-20',
        doctorName: 'Dr. Sarah Johnson',
        diagnosis: 'Hypertension',
        prescription: 'Lisinopril 10mg daily',
        notes: 'Blood pressure monitoring recommended'
    }
];

const specializations = [
    { name: 'Cardiology', icon: Heart, color: 'bg-red-100 text-red-600' },
    { name: 'Neurology', icon: Brain, color: 'bg-purple-100 text-purple-600' },
    { name: 'Ophthalmology', icon: Eye, color: 'bg-blue-100 text-blue-600' },
    { name: 'Orthopedics', icon: Bone, color: 'bg-orange-100 text-orange-600' }
];

const PatientHome = () => {
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
    const [activeSection, setActiveSection] = useState<string>('dashboard');

    const handleBookAppointment = () => {
        if (!selectedDoctor || !selectedTimeSlot) {
            toast.error('Please select a doctor and time slot');
            return;
        }
        toast.success(`Appointment booked with ${selectedDoctor.name} at ${selectedTimeSlot}`);
        setSelectedDoctor(null);
        setSelectedTimeSlot('');
    };

    const filteredDoctors = selectedSpecialization
        ? mockDoctors.filter(doctor => doctor.specialization === selectedSpecialization)
        : mockDoctors;

    const renderDashboard = () => (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-200 bg-white shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 text-sm font-medium">Upcoming</p>
                                <p className="text-2xl font-bold text-green-800">
                                    {mockAppointments.filter(apt => apt.status === 'upcoming').length}
                                </p>
                            </div>
                            <Calendar className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-white shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 text-sm font-medium">Completed</p>
                                <p className="text-2xl font-bold text-green-800">
                                    {mockAppointments.filter(apt => apt.status === 'completed').length}
                                </p>
                            </div>
                            <Activity className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-white shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 text-sm font-medium">Records</p>
                                <p className="text-2xl font-bold text-green-800">{mockMedicalRecords.length}</p>
                            </div>
                            <FileText className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-white shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 text-sm font-medium">Doctors</p>
                                <p className="text-2xl font-bold text-green-800">{mockDoctors.length}</p>
                            </div>
                            <Stethoscope className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Appointments */}
            <Card className="border-green-200 bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-green-800">Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment._id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-green-800">{appointment.doctorName}</p>
                                    <p className="text-sm text-green-600">{appointment.specialization}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">{appointment.date}</p>
                                <p className="text-sm text-gray-600">{appointment.time}</p>
                                <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}
                                    className={appointment.status === 'upcoming' ? 'bg-green-100 text-green-800' : ''}>
                                    {appointment.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

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
                                    onClick={() => setSelectedSpecialization(spec.name)}
                                    className={`h-20 flex-col space-y-2 ${selectedSpecialization === spec.name
                                        ? 'bg-green-600 hover:bg-green-700'
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
                                {filteredDoctors.map((doctor) => (
                                    <Card
                                        key={doctor._id}
                                        className={`cursor-pointer transition-all ${selectedDoctor?._id === doctor._id
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-green-200 hover:border-green-300'
                                            }`}
                                        onClick={() => setSelectedDoctor(doctor)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-green-800">{doctor.name}</h4>
                                                <p className="text-green-600">{doctor.specialization}</p>
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm">{doctor.location}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="text-sm text-gray-600">{doctor.rating}</span>
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
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Available Time Slots</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {selectedDoctor.availableSlots.map((slot) => (
                                    <Button
                                        key={slot}
                                        variant={selectedTimeSlot === slot ? "default" : "outline"}
                                        onClick={() => setSelectedTimeSlot(slot)}
                                        className={`${selectedTimeSlot === slot
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'border-green-200 hover:bg-green-50'
                                            }`}
                                    >
                                        {slot}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Book Button */}
                    {selectedDoctor && selectedTimeSlot && (
                        <Button
                            onClick={handleBookAppointment}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            size="lg"
                        >
                            Book Appointment
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );

    const renderMedicalHistory = () => (
        <div className="space-y-6">
            <Card className="border-green-200 bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-green-800">Medical History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockMedicalRecords.map((record) => (
                        <Card key={record._id} className="border-green-100 bg-green-50">
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-green-800">{record.diagnosis}</h4>
                                        <span className="text-sm text-gray-600">{record.date}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-green-700">Doctor:</p>
                                            <p className="text-sm text-gray-600">{record.doctorName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-green-700">Prescription:</p>
                                            <p className="text-sm text-gray-600">{record.prescription}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-green-700">Notes:</p>
                                        <p className="text-sm text-gray-600">{record.notes}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    const renderAppointments = () => (
        <div className="space-y-6">
            <Card className="border-green-200 bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-green-800">My Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockAppointments.map((appointment) => (
                        <Card key={appointment._id} className="border-green-100">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-green-800">{appointment.doctorName}</h4>
                                            <p className="text-green-600">{appointment.specialization}</p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{appointment.date}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{appointment.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}
                                            className={appointment.status === 'upcoming' ? 'bg-green-100 text-green-800' : ''}>
                                            {appointment.status}
                                        </Badge>
                                        {appointment.status === 'upcoming' && (
                                            <div className="space-x-2">
                                                <Button size="sm" variant="outline" className="border-green-200 text-green-600">
                                                    Reschedule
                                                </Button>
                                                <Button size="sm" variant="outline" className="border-red-200 text-red-600">
                                                    Cancel
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-800">Patient Portal</h1>
                                <p className="text-green-600">Welcome back, John Doe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white border-b border-green-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex space-x-8">
                        {[
                            { key: 'dashboard', label: 'Dashboard', icon: Activity },
                            { key: 'booking', label: 'Book Appointment', icon: Calendar },
                            { key: 'appointments', label: 'My Appointments', icon: Clock },
                            { key: 'history', label: 'Medical History', icon: FileText }
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${activeSection === key
                                    ? 'border-green-600 text-green-600'
                                    : 'border-transparent text-gray-600 hover:text-green-600'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeSection === 'dashboard' && renderDashboard()}
                {activeSection === 'booking' && renderBookingSection()}
                {activeSection === 'appointments' && renderAppointments()}
                {activeSection === 'history' && renderMedicalHistory()}
            </main>
        </div>
    );
};

export default PatientHome;