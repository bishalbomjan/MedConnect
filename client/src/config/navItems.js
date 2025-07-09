import { Stethoscope, Users, Heart, Clock } from "lucide-react";

export const sidebarMenu = {
  admin: [
    { label: "Doctor", path: "/admin/doctor-approval", icon: Stethoscope },
    { label: "Patient", path: "/admin/patient-approval", icon: Users },
    { label: "Appoinment", path: "/admin/appoinment", icon: Heart },
  ],
  doctor: [
    { label: "Appoinment", path: "/users/doctor/appointments", icon: Heart },
    { label: "Create TimeSlot", path: "/users/doctor/timeSlot", icon: Clock },
  ],
  patient: [
    { label: "Profile", path: "/users/patient/profile", icon: Users },
    { label: "My Doctors", path: "/patient/myDoctors", icon: Stethoscope },
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
