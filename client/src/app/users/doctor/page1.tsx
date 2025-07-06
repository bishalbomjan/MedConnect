'use client'
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DoctorSidebar } from '@/components/doctorsidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
    Calendar,
    Clock,
    User,
    Phone,
    Mail,
    Activity,
    Users,
    CheckCircle,
    XCircle,
    Edit,
    Search,
    Menu,
    Plus,
    BookOpen
} from 'lucide-react';
import { toast } from 'sonner';

interface DoctorInfo {
    id: string;
    fullname: string;
    degree: string;
    NMCID: string;
    specializations: string[];
    experience: Array<{
        body: string;
        date: Date;
        year: string;
    }>;
    isKycSubmitted: boolean;
    isKycApproved: boolean;
}

interface Appointment {
    id: string;
    bookedById: string;
    doctorId: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' | 'Booked';
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    createdAt: string;
    timeSlot?: {
        date: string;
        startTime: string;
        endTime: string;
    };
}

interface TimeSlot {
    id: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    bookedById?: string;
}

interface DoctorStats {
    totalAppointments: number;
    pendingAppointments: number;
    completedAppointments: number;
    todaySlots: number;
}

// Mock data based on the models
const mockDoctorInfo: DoctorInfo = {
    id: '1',
    fullname: 'Dr. John Smith',
    degree: 'MBBS, MD (Cardiology)',
    NMCID: 'NMC123456789',
    specializations: ['Cardiology', 'Internal Medicine'],
    experience: [
        {
            body: 'Senior Cardiologist at City Hospital',
            date: new Date('2020-01-01'),
            year: '2020-2024'
        }
    ],
    isKycSubmitted: true,
    isKycApproved: true
};

const mockAppointments: Appointment[] = [
    {
        id: '1',
        bookedById: 'patient1',
        doctorId: 'doctor1',
        status: 'Pending',
        patientName: 'John Doe',
        patientEmail: 'john.doe@email.com',
        patientPhone: '+1 (555) 123-4567',
        createdAt: '2024-01-15T09:00:00Z',
        timeSlot: {
            date: '2024-01-16',
            startTime: '09:00',
            endTime: '09:40'
        }
    },
    {
        id: '2',
        bookedById: 'patient2',
        doctorId: 'doctor1',
        status: 'Booked',
        patientName: 'Jane Smith',
        patientEmail: 'jane.smith@email.com',
        patientPhone: '+1 (555) 987-6543',
        createdAt: '2024-01-15T10:30:00Z',
        timeSlot: {
            date: '2024-01-16',
            startTime: '10:00',
            endTime: '10:40'
        }
    }
];

const mockTimeSlots: TimeSlot[] = [
    {
        id: '1',
        doctorId: 'doctor1',
        date: '2024-01-16',
        startTime: '09:00',
        endTime: '09:40',
        isBooked: true,
        bookedById: 'patient1'
    },
    {
        id: '2',
        doctorId: 'doctor1',
        date: '2024-01-16',
        startTime: '10:00',
        endTime: '10:40',
        isBooked: false
    }
];

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
    const [searchTerm, setSearchTerm] = useState('');
    const [newSlot, setNewSlot] = useState({
        date: '',
        startTime: '',
        endTime: ''
    });

    const doctorInfo = mockDoctorInfo;

    const stats: DoctorStats = {
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(apt => apt.status === 'Pending').length,
        completedAppointments: appointments.filter(apt => apt.status === 'Completed').length,
        todaySlots: timeSlots.filter(slot =>
            new Date(slot.date).toDateString() === new Date().toDateString()
        ).length
    };

    const handleStatusUpdate = (appointmentId: string, newStatus: Appointment['status']) => {
        setAppointments(prev =>
            prev.map(apt =>
                apt.id === appointmentId
                    ? { ...apt, status: newStatus }
                    : apt
            )
        );
        toast.success(`Appointment ${newStatus.toLowerCase()} successfully`);
    };

    const handleCreateTimeSlot = () => {
        if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
            toast.error('Please fill all time slot fields');
            return;
        }

        const slot: TimeSlot = {
            id: Date.now().toString(),
            doctorId: 'doctor1',
            date: newSlot.date,
            startTime: newSlot.startTime,
            endTime: newSlot.endTime,
            isBooked: false
        };

        setTimeSlots(prev => [...prev, slot]);
        setNewSlot({ date: '', startTime: '', endTime: '' });
        toast.success('Time slot created successfully');
    };

    const filteredAppointments = appointments.filter(apt =>
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Booked': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-purple-100 text-purple-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <DoctorSidebar />
                <main className="flex-1">
                    <div className="bg-gradient-to-br from-green-50 to-white p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <SidebarTrigger className="lg:hidden">
                                <Menu className="w-6 h-6" />
                            </SidebarTrigger>
                            <div>
                                <h1 className="text-4xl font-bold text-green-800">Doctor Dashboard</h1>
                                <p className="text-green-600 text-lg">Welcome back, {doctorInfo.fullname}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Badge className="bg-green-100 text-green-800">{doctorInfo.degree}</Badge>
                                    <Badge className="bg-blue-100 text-blue-800">NMCID: {doctorInfo.NMCID}</Badge>
                                    {doctorInfo.isKycApproved && (
                                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card className="border-green-200 bg-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-600 text-sm font-medium">Total Appointments</p>
                                            <p className="text-3xl font-bold text-green-800">{stats.totalAppointments}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-green-200 bg-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-600 text-sm font-medium">Pending</p>
                                            <p className="text-3xl font-bold text-green-800">{stats.pendingAppointments}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-yellow-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-green-200 bg-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-600 text-sm font-medium">Completed</p>
                                            <p className="text-3xl font-bold text-green-800">{stats.completedAppointments}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-green-200 bg-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-600 text-sm font-medium">Today's Slots</p>
                                            <p className="text-3xl font-bold text-green-800">{stats.todaySlots}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Activity className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content Tabs */}
                        <Tabs defaultValue="appointments" className="space-y-6">
                            <TabsList className="bg-green-100">
                                <TabsTrigger value="appointments" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                                    Appointments
                                </TabsTrigger>
                                <TabsTrigger value="slots" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                                    Time Slots
                                </TabsTrigger>
                                <TabsTrigger value="profile" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                                    Profile
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="appointments" className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-green-800">Appointments Management</h2>
                                    <div className="relative max-w-md">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
                                        <Input
                                            placeholder="Search appointments..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 border-green-200 focus:border-green-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {filteredAppointments.map((appointment) => (
                                        <Card key={appointment.id} className="border-green-200 bg-white shadow-lg">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-green-800 text-lg">
                                                        {appointment.patientName}
                                                    </CardTitle>
                                                    <Badge className={getStatusColor(appointment.status)}>
                                                        {appointment.status}
                                                    </Badge>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-3">
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <Mail className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm">{appointment.patientEmail}</span>
                                                </div>

                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <Phone className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm">{appointment.patientPhone}</span>
                                                </div>

                                                {appointment.timeSlot && (
                                                    <>
                                                        <div className="flex items-center space-x-2 text-gray-600">
                                                            <Calendar className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">{appointment.timeSlot.date}</span>
                                                        </div>

                                                        <div className="flex items-center space-x-2 text-gray-600">
                                                            <Clock className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">{appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}</span>
                                                        </div>
                                                    </>
                                                )}

                                                {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                                                    <div className="flex space-x-2 pt-4">
                                                        <Button
                                                            onClick={() => handleStatusUpdate(appointment.id, 'In Progress')}
                                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                                            size="sm"
                                                        >
                                                            Start
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleStatusUpdate(appointment.id, 'Completed')}
                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                            size="sm"
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                            Complete
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleStatusUpdate(appointment.id, 'Cancelled')}
                                                            variant="outline"
                                                            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                                                            size="sm"
                                                        >
                                                            <XCircle className="w-4 h-4 mr-1" />
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="slots" className="space-y-4">
                                <h2 className="text-2xl font-bold text-green-800">Time Slot Management</h2>

                                {/* Create New Time Slot */}
                                <Card className="border-green-200 bg-white shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-green-800 flex items-center">
                                            <Plus className="w-5 h-5 mr-2" />
                                            Create New Time Slot
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">Date</label>
                                                <Input
                                                    type="date"
                                                    value={newSlot.date}
                                                    onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                                                    className="border-green-200 focus:border-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">Start Time</label>
                                                <Input
                                                    type="time"
                                                    value={newSlot.startTime}
                                                    onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                                                    className="border-green-200 focus:border-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">End Time</label>
                                                <Input
                                                    type="time"
                                                    value={newSlot.endTime}
                                                    onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                                                    className="border-green-200 focus:border-green-500"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleCreateTimeSlot}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Time Slot
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Existing Time Slots */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {timeSlots.map((slot) => (
                                        <Card key={slot.id} className="border-green-200 bg-white shadow-lg">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-green-800 text-lg">
                                                        {slot.date}
                                                    </CardTitle>
                                                    <Badge className={slot.isBooked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                                                        {slot.isBooked ? 'Booked' : 'Available'}
                                                    </Badge>
                                                </div>
                                            </CardHeader>

                                            <CardContent>
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <Clock className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm">{slot.startTime} - {slot.endTime}</span>
                                                </div>
                                                {slot.isBooked && slot.bookedById && (
                                                    <div className="flex items-center space-x-2 text-gray-600 mt-2">
                                                        <User className="w-4 h-4 text-green-600" />
                                                        <span className="text-sm">Patient ID: {slot.bookedById}</span>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="profile" className="space-y-4">
                                <h2 className="text-2xl font-bold text-green-800">Doctor Profile</h2>

                                <Card className="border-green-200 bg-white shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-green-800 flex items-center">
                                            <User className="w-5 h-5 mr-2" />
                                            Professional Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">Full Name</label>
                                                <p className="text-gray-800">{doctorInfo.fullname}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">Degree</label>
                                                <p className="text-gray-800">{doctorInfo.degree}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">NMC ID</label>
                                                <p className="text-gray-800">{doctorInfo.NMCID}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">KYC Status</label>
                                                <div className="flex space-x-2">
                                                    <Badge className={doctorInfo.isKycSubmitted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                                        {doctorInfo.isKycSubmitted ? 'Submitted' : 'Not Submitted'}
                                                    </Badge>
                                                    <Badge className={doctorInfo.isKycApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                        {doctorInfo.isKycApproved ? 'Approved' : 'Pending'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-700 mb-2">Specializations</label>
                                            <div className="flex flex-wrap gap-2">
                                                {doctorInfo.specializations.map((spec, index) => (
                                                    <Badge key={index} className="bg-blue-100 text-blue-800">
                                                        {spec}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-700 mb-2">Experience</label>
                                            <div className="space-y-2">
                                                {doctorInfo.experience.map((exp, index) => (
                                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                                        <p className="text-gray-800 font-medium">{exp.body}</p>
                                                        <p className="text-gray-600 text-sm">{exp.year}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default DoctorDashboard;