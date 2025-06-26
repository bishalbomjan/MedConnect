'use client'
import React, { useState } from 'react';
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
    MapPin,
    Activity,
    Users,
    CheckCircle,
    XCircle,
    Edit,
    Search
} from 'lucide-react';
import { toast } from 'sonner';

interface Appointment {
    id: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    date: string;
    time: string;
    type: string;
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
    reason: string;
}

interface DoctorStats {
    todayAppointments: number;
    upcomingAppointments: number;
    totalPatients: number;
    completedToday: number;
}

const mockAppointments: Appointment[] = [
    {
        id: '1',
        patientName: 'John Smith',
        patientEmail: 'john.smith@email.com',
        patientPhone: '+1 (555) 123-4567',
        date: '2024-01-15',
        time: '09:00',
        type: 'Consultation',
        status: 'scheduled',
        reason: 'Regular checkup'
    },
    {
        id: '2',
        patientName: 'Sarah Johnson',
        patientEmail: 'sarah.j@email.com',
        patientPhone: '+1 (555) 987-6543',
        date: '2024-01-15',
        time: '10:30',
        type: 'Follow-up',
        status: 'confirmed',
        reason: 'Blood test results review'
    },
    {
        id: '3',
        patientName: 'Mike Brown',
        patientEmail: 'mike.brown@email.com',
        patientPhone: '+1 (555) 456-7890',
        date: '2024-01-15',
        time: '14:00',
        type: 'Emergency',
        status: 'scheduled',
        reason: 'Chest pain'
    },
    {
        id: '4',
        patientName: 'Emily Davis',
        patientEmail: 'emily.davis@email.com',
        patientPhone: '+1 (555) 321-9876',
        date: '2024-01-16',
        time: '11:00',
        type: 'Consultation',
        status: 'scheduled',
        reason: 'Headache consultation'
    }
];

const DoctorHome = () => {
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [searchTerm, setSearchTerm] = useState('');

    const stats: DoctorStats = {
        todayAppointments: appointments.filter(apt => apt.date === '2024-01-15').length,
        upcomingAppointments: appointments.filter(apt => apt.status === 'scheduled' || apt.status === 'confirmed').length,
        totalPatients: appointments.length,
        completedToday: appointments.filter(apt => apt.date === '2024-01-15' && apt.status === 'completed').length
    };

    const handleReschedule = (appointmentId: string) => {
        // In a real app, this would open a date/time picker modal
        toast.info('Reschedule functionality would open a date/time picker');
    };

    const handleCancel = (appointmentId: string) => {
        setAppointments(prev =>
            prev.map(apt =>
                apt.id === appointmentId
                    ? { ...apt, status: 'cancelled' as const }
                    : apt
            )
        );
        toast.success('Appointment cancelled successfully');
    };

    const handleComplete = (appointmentId: string) => {
        setAppointments(prev =>
            prev.map(apt =>
                apt.id === appointmentId
                    ? { ...apt, status: 'completed' as const }
                    : apt
            )
        );
        toast.success('Appointment marked as completed');
    };

    const filteredAppointments = appointments.filter(apt =>
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const todayAppointments = filteredAppointments.filter(apt => apt.date === '2024-01-15');
    const upcomingAppointments = filteredAppointments.filter(apt =>
        apt.date > '2024-01-15' && (apt.status === 'scheduled' || apt.status === 'confirmed')
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">Doctor Dashboard</h1>
                    <p className="text-green-600 text-lg">Welcome back, Dr. Smith</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-green-200 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Today's Appointments</p>
                                    <p className="text-3xl font-bold text-green-800">{stats.todayAppointments}</p>
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
                                    <p className="text-green-600 text-sm font-medium">Upcoming</p>
                                    <p className="text-3xl font-bold text-green-800">{stats.upcomingAppointments}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Total Patients</p>
                                    <p className="text-3xl font-bold text-green-800">{stats.totalPatients}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Completed Today</p>
                                    <p className="text-3xl font-bold text-green-800">{stats.completedToday}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="mb-6">
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

                {/* Appointments Tabs */}
                <Tabs defaultValue="today" className="space-y-6">
                    <TabsList className="bg-green-100">
                        <TabsTrigger value="today" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            Today's Appointments
                        </TabsTrigger>
                        <TabsTrigger value="upcoming" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            Upcoming
                        </TabsTrigger>
                        <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            All Appointments
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="today" className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-800">Today's Schedule</h2>
                        {todayAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {todayAppointments.map((appointment) => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        onReschedule={handleReschedule}
                                        onCancel={handleCancel}
                                        onComplete={handleComplete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Card className="border-green-200 bg-white shadow-lg">
                                <CardContent className="p-8 text-center">
                                    <Calendar className="w-12 h-12 text-green-300 mx-auto mb-4" />
                                    <p className="text-green-600">No appointments scheduled for today</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="upcoming" className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-800">Upcoming Appointments</h2>
                        {upcomingAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {upcomingAppointments.map((appointment) => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        onReschedule={handleReschedule}
                                        onCancel={handleCancel}
                                        onComplete={handleComplete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Card className="border-green-200 bg-white shadow-lg">
                                <CardContent className="p-8 text-center">
                                    <Clock className="w-12 h-12 text-green-300 mx-auto mb-4" />
                                    <p className="text-green-600">No upcoming appointments</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="all" className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-800">All Appointments</h2>
                        {filteredAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {filteredAppointments.map((appointment) => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        onReschedule={handleReschedule}
                                        onCancel={handleCancel}
                                        onComplete={handleComplete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Card className="border-green-200 bg-white shadow-lg">
                                <CardContent className="p-8 text-center">
                                    <Search className="w-12 h-12 text-green-300 mx-auto mb-4" />
                                    <p className="text-green-600">No appointments found</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

interface AppointmentCardProps {
    appointment: Appointment;
    onReschedule: (id: string) => void;
    onCancel: (id: string) => void;
    onComplete: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
    appointment,
    onReschedule,
    onCancel,
    onComplete
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Emergency': return 'bg-red-100 text-red-800';
            case 'Follow-up': return 'bg-blue-100 text-blue-800';
            case 'Consultation': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card className="border-green-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800 text-lg">{appointment.patientName}</CardTitle>
                    <div className="flex space-x-2">
                        <Badge className={getTypeColor(appointment.type)}>
                            {appointment.type}
                        </Badge>
                        <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                        </Badge>
                    </div>
                </div>
                <p className="text-green-600 font-medium">{appointment.reason}</p>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{appointment.date}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{appointment.time}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{appointment.patientEmail}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{appointment.patientPhone}</span>
                </div>

                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                    <div className="flex space-x-2 pt-4">
                        <Button
                            onClick={() => onComplete(appointment.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                        >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                        </Button>
                        <Button
                            onClick={() => onReschedule(appointment.id)}
                            variant="outline"
                            className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                            size="sm"
                        >
                            <Edit className="w-4 h-4 mr-1" />
                            Reschedule
                        </Button>
                        <Button
                            onClick={() => onCancel(appointment.id)}
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
    );
};

export default DoctorHome;