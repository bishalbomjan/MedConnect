'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Clock, User, CheckCircle, XCircle, FileText, Activity } from 'lucide-react';
import { format } from 'date-fns';
import apiClient from '@/app/api-client';


const Appoinment = () => {
  const [appointments, setAppointment] = useState([]);

  const fetchAppoinment = async () => {
    try {
      const response = await apiClient.get('/timeslot');
      setAppointment(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppoinment();
  }, []);

  const [activeTab, setActiveTab] = useState<'booked' | 'unbooked'>('booked');


  const bookedAppointments = appointments.filter(apt => apt.isBooked);
  const unbookedAppointments = appointments.filter(apt => !apt.isBooked);
  const currentAppointments = activeTab === 'booked' ? bookedAppointments : unbookedAppointments;

  const getStatusColor = (status: string, isBooked: boolean) => {
    if (isBooked) {
      return 'bg-green-500 text-white hover:bg-green-600';
    }
    return 'bg-blue-500 text-white hover:bg-blue-600';
  };

  const stats = {
    total: appointments.length,
    booked: bookedAppointments.length,
    unbooked: unbookedAppointments.length,
    withPrescription: appointments.filter(apt => apt.prescrption).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Monitor and manage appointment bookings across the platform
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                  <p className="text-3xl font-bold text-primary">{stats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Booked</p>
                  <p className="text-3xl font-bold text-green-600">{stats.booked}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.unbooked}</p>
                </div>
                <XCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">With Prescription</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.withPrescription}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toggle Buttons */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Appointment Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button
                variant={activeTab === 'booked' ? 'default' : 'outline'}
                onClick={() => setActiveTab('booked')}
                className="flex items-center space-x-2 px-6 py-3"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Booked Appointments ({stats.booked})</span>
              </Button>
              <Button
                variant={activeTab === 'unbooked' ? 'default' : 'outline'}
                onClick={() => setActiveTab('unbooked')}
                className="flex items-center space-x-2 px-6 py-3"
              >
                <XCircle className="h-4 w-4" />
                <span>Available Slots ({stats.unbooked})</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <Calendar className="h-5 w-5" />
              <span>
                {activeTab === 'booked' ? 'Booked Appointments' : 'Available Appointment Slots'}
              </span>
              <Badge variant="secondary" className="ml-2">
                {currentAppointments.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Doctor</TableHead>
                    <TableHead className="font-semibold">Specialization</TableHead>
                    <TableHead className="font-semibold">Date & Time</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Experience</TableHead>
                    <TableHead className="font-semibold">Prescription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments.map((appointment) => (
                    <TableRow
                      key={appointment._id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-primary">{appointment.doctorId?.fullname}</p>
                            <p className="text-sm text-muted-foreground">{appointment.doctorId?.degree}</p>
                            <p className="text-xs text-muted-foreground">NMC: {appointment.doctorId?.NMCID}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {appointment.doctorId.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {format(new Date(appointment.date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {appointment.startTime} - {appointment.endTime}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status, appointment.isBooked)}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="font-medium">{appointment.doctorId?.experienceYear} years</span>
                          <div className="flex items-center space-x-1 mt-1">
                            {appointment.doctorId.isKycApproved ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              KYC {appointment.doctorId?.isKycApproved ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {appointment.prescrption ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                            <FileText className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            None
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {currentAppointments.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                  {activeTab === 'booked' ? (
                    <CheckCircle className="h-12 w-12 text-muted-foreground" />
                  ) : (
                    <Calendar className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No {activeTab === 'booked' ? 'booked appointments' : 'available slots'} found
                </h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'booked'
                    ? 'There are currently no booked appointments to display.'
                    : 'All appointment slots are currently booked.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appoinment;