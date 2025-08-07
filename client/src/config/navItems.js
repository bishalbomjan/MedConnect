import { Stethoscope, Users, Calendar, Heart, Clock } from "lucide-react";

export const sidebarMenu = {
  admin: [
    { label: "DashBoard", path: "/admin/appointment", icon: Calendar },
    { label: "Doctor", path: "/admin/doctor-approval", icon: Stethoscope },
    { label: "Patient", path: "/admin/patient-approval", icon: Users },
  ],
  doctor: [
    {
      label: "Appointments",
      path: "/users/doctor/appointment",
      icon: Calendar,
    },
    { label: "My Profile", path: "/users/doctor/profile", icon: Users },
    { label: "Create TimeSlot", path: "/users/doctor/timeSlot", icon: Clock },
  ],
  patient: [
    { label: "Profile", path: "/users/patient/profile", icon: Users },
    {
      label: "My Doctors",
      path: "/users/patient/myDoctors",
      icon: Stethoscope,
    },
    {
      label: "Book Appointments",
      path: "/users/patient/bookappoinment",
      icon: Heart,
    },
    {
      label: "My Appointments",
      path: "users/patient/appointments",
      icon: Heart,
    },
  ],
};
