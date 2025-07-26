"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
    Calendar,
    Clock,
    User,
    Phone,
    Search,
    Filter,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import apiClient from "@/app/api-client";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
const DoctorAppointments = () => {
    const router = useRouter();
    const { _id } = useSelector((state: any) => state.user);
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const fetchAppointments = async () => {
        const res = await apiClient.get(`/timeslot?doctorId=${_id}`);
        setAppointments(res.data);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const getStatusCounts = () => {
        return {
            total: appointments.length,
            scheduled: appointments.filter((a) => a.status === "Schedual").length,
            inProgress: appointments.filter((a) => a.status === "In Progress").length,
            completed: appointments.filter((a) => a.status === "Completed").length,
            cancelled: appointments.filter((a) => a.status === "Cancelled").length,
            booked: appointments.filter((a) => a.status === "Booked").length,
        };
    };

    const statusCounts = getStatusCounts();

    const filteredAppointments = appointments.filter((a) => {
        const matchesSearch =
            (a.bookedById?.fullname || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (a.patient?.phone || "").includes(searchTerm);
        const matchesStatus = statusFilter === "all" || a.status === statusFilter;
        const matchesType = typeFilter === "all" || a.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Scheduled":
                return "bg-blue-500 hover:bg-blue-600";
            case "In Progress":
                return "bg-purple-500 hover:bg-purple-600";
            case "Completed":
                return "bg-green-500 hover:bg-green-600";
            case "Cancelled":
                return "bg-red-500 hover:bg-red-600";
            case "Booked":
                return "bg-orange-500 hover:bg-orange-600";
            default:
                return "bg-gray-500 hover:bg-gray-600";
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "consultation":
                return "bg-medconnect-green text-white";
            case "follow-up":
                return "bg-medconnect-light-green text-medconnect-green";
            case "emergency":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };
    const handleCancellation = async (doc, pac) => {
        try {
            debugger;
            const res = await apiClient.patch(`/timeslot/cancel/${doc}/${pac}`);
            toast(res.data.message);
            debugger;
        } catch (error) {
            toast.error("Cancellation failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-medconnect-pale-green p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-medconnect-green mb-2">
                        Doctor Appointments
                    </h1>
                    <p className="text-gray-600">
                        Click on any appointment to create prescription and examination notes
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {[
                        {
                            label: "Total",
                            count: statusCounts.total,
                            icon: <Calendar className="h-5 w-5 text-medconnect-green" />,
                            color: "text-medconnect-green",
                        },
                        {
                            label: "Scheduled",
                            count: statusCounts.scheduled,
                            icon: <Clock className="h-5 w-5 text-blue-600" />,
                            color: "text-blue-600",
                        },
                        {
                            label: "In Progress",
                            count: statusCounts.inProgress,
                            icon: <div className="h-5 w-5 rounded-full bg-purple-500" />,
                            color: "text-purple-600",
                        },
                        {
                            label: "Completed",
                            count: statusCounts.completed,
                            icon: <div className="h-5 w-5 rounded-full bg-green-500" />,
                            color: "text-green-600",
                        },
                        {
                            label: "Cancelled",
                            count: statusCounts.cancelled,
                            icon: <div className="h-5 w-5 rounded-full bg-red-500" />,
                            color: "text-red-600",
                        },
                        {
                            label: "Booked",
                            count: statusCounts.booked,
                            icon: <div className="h-5 w-5 rounded-full bg-orange-500" />,
                            color: "text-orange-600",
                        },
                    ].map((item, idx) => (
                        <Card key={idx} className="border border-gray-200">
                            <CardContent className="p-4 flex items-center space-x-2">
                                {item.icon}
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{item.label}</p>
                                    <p className={`text-2xl font-bold ${item.color}`}>{item.count}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-medconnect-green">
                            <Filter className="h-5 w-5" />
                            <span>Filters</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by patient name or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-medconnect-green/30 focus:border-medconnect-green"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="border-medconnect-green/30 focus:border-medconnect-green">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    <SelectItem value="Booked">Booked</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="border-medconnect-green/30 focus:border-medconnect-green">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="follow-up">Follow-up</SelectItem>
                                    <SelectItem value="emergency">Emergency</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Appointments Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-medconnect-green">
                            Appointments ({filteredAppointments.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Patient Contact</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAppointments.map((a) => (
                                        <TableRow
                                            key={a._id}
                                            className="hover:bg-medconnect-pale-green/50 cursor-pointer"
                                        >
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <User className="h-4 w-4 text-medconnect-green" />
                                                    <span className="font-medium">{a?.bookedById?.fullname || "Unbooked"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm">{a.doctorId?.fullname || "-"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm">{a?.patient?.phoneNumber || "-"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm">{format(new Date(a.date), "MMM dd, yyyy")}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm">
                                                            {a.startTime} - {a.endTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(a.status)}>
                                                    {a.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button disabled={a.status !== 'Booked'} onClick={() => { router.push(`/users/doctor/prescription/${a._id}`); }}>Start Consulting</Button>
                                                    <Button onClick={() => { handleCancellation(a.doctorId._id, a.bookedById._id) }}>Cancel</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DoctorAppointments;
