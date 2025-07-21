import { Stethoscope, Users, Heart, Clock } from "lucide-react";

export const sidebarMenu = {
  admin: [
    { label: "DashBoard", path: "/admin/appoinment", icon: Heart },
    { label: "Doctor", path: "/admin/doctor-approval", icon: Stethoscope },
    { label: "Patient", path: "/admin/patient-approval", icon: Users },
  ],
  doctor: [
    { label: "My Profile", path: "/users/doctor/profile", icon: Heart },
    { label: "My Appoinment", path: "/users/doctor/appoinment", icon: Heart },
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
