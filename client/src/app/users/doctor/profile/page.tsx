"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Award,
  GraduationCap,
  Star,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import apiClient from "@/app/api-client";
import { useSelector } from "react-redux";

// Type definitions
interface DoctorProfile {
  _id?: string;
  fullname?: string;
  degree?: string;
  NMCID?: string;
  specializations?: string[];
  experience?: string;
  experienceYear?: string;
  price?: number;
  uploadFiles?: string;
  isKycSubmitted?: boolean;
  isKycApproved?: boolean;
  email?: string;
  phoneNumber?: string;
  location?: string;
}

export default function DoctorProfile() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { _id } = useSelector((state: any) => state.user);

  const fetchDoctorProfile = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/doctorkycs/${_id}`);
      if (res?.data?.kyc?.isKycSubmitted) {
        setProfile(res.data.kyc);
      } else {
        const response = await apiClient.get(`/user/${_id}`);
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "DR";

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <Skeleton className="w-32 h-32 rounded-full" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <p className="text-green-700 text-lg">No profile data available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Main Profile Card */}
        <Card className="shadow-xl overflow-hidden">
          <div className="bg-green-600 p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  {profile.uploadFiles ? (
                    <AvatarImage
                      className="object-cover"
                      src={`http://localhost:8080/images/${profile.uploadFiles}`}
                      alt={profile.fullname}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl font-bold bg-green-100 text-green-700">
                      {getInitials(profile.fullname || "Doctor")}
                    </AvatarFallback>
                  )}
                </Avatar>
                {profile.isKycApproved && (
                  <div className="absolute -bottom-2 -right-2">
                    <Badge className="bg-white text-green-600 hover:bg-gray-100 px-3 py-1 rounded-full shadow-lg">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center lg:text-left space-y-4">
                <h1 className="text-4xl font-bold mb-2">
                  {profile.fullname || "Doctor Profile"}
                </h1>
                {profile.degree && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
                    <Badge className="text-lg px-4 py-2 bg-green-500 text-white">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      {profile.degree}
                    </Badge>
                    {profile.experienceYear && (
                      <Badge className="text-lg px-4 py-2 bg-green-500 text-white">
                        <Clock className="w-5 h-5 mr-2" />
                        {profile.experienceYear} Years
                      </Badge>
                    )}
                  </div>
                )}

                {profile.specializations &&
                  profile.specializations.length > 0 && (
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {profile.specializations.map((spec, index) => (
                        <Badge
                          key={index}
                          className="bg-green-100 text-green-700 border-green-300 px-3 py-1"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  )}

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-green-50">
                  {profile.email && (
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                  {profile.phoneNumber && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{profile.phoneNumber}</span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* KYC Status and Details */}
          {profile.isKycSubmitted ? (
            <CardContent className="p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  {profile.NMCID && (
                    <div className="p-6 bg-green-100 rounded-xl">
                      <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Medical License
                      </h3>
                      <p className="text-2xl font-bold text-green-900">
                        #{profile.NMCID}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Nepal Medical Council
                      </p>
                    </div>
                  )}

                  {profile.price && (
                    <div className="p-6 bg-green-100 rounded-xl">
                      <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Consultation Fee
                      </h3>
                      <p className="text-2xl font-bold text-green-900">
                        Rs. {profile.price}
                      </p>
                      <p className="text-sm text-green-600 mt-1">Per Session</p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {profile.experience && (
                    <div className="p-6 bg-green-100 rounded-xl">
                      <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Professional Experience
                      </h3>
                      <p className="text-green-800 leading-relaxed">
                        {profile.experience}
                      </p>
                    </div>
                  )}

                  <div className="p-6 bg-green-100 rounded-xl">
                    <h3 className="font-semibold text-green-700 mb-3">
                      Verification Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">
                          KYC Submitted
                        </span>
                      </div>
                      <div className="flex items-center">
                        {profile.isKycApproved ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-green-700 font-medium">
                              KYC Approved
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-green-700 font-medium">
                              KYC Pending
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="p-6 bg-green-100 rounded-xl">
                  <AlertCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Basic Profile
                  </h3>
                  <p className="text-green-700">
                    Complete KYC verification to unlock full profile features
                  </p>
                  <div className="mt-4 space-y-2">
                    {profile.email && (
                      <p className="text-green-800">
                        <Mail className="w-4 h-4 inline mr-2" />
                        {profile.email}
                      </p>
                    )}
                    {profile.phoneNumber && (
                      <p className="text-green-800">
                        <Phone className="w-4 h-4 inline mr-2" />
                        {profile.phoneNumber}
                      </p>
                    )}
                    {profile.location && (
                      <p className="text-green-800">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        {profile.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
